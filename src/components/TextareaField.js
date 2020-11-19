import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Label = styled.label`
  color: #777;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;

  &:not(:first-child) {
    margin-top: 20px;
  }
`;
const Textarea = styled.textarea`
  border: solid 1px ${({ isInvalid }) => (isInvalid ? "#500" : "#777")};
  border-radius: 2px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 1.2rem;
  height: 148px;
  margin-top: 5px;
  outline: none;
  padding: 10px;

  &:focus {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.1);
  }
`;
const ErrorMessage = styled.p`
  color: #b00;
  font-size: 0.7rem;
  height: 22px;
  margin-top: 3px;
`;

export const TextareaField = ({
  id,
  isInvalid,
  label,
  name,
  onBlur,
  onChange,
  required,
  type = "text",
  validationError,
  value,
}) => {
  return (
    <Label htmlFor={id}>
      {label}
      <Textarea
        id={id}
        isInvalid={isInvalid}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
      <ErrorMessage>{isInvalid && validationError}</ErrorMessage>
    </Label>
  );
};

export default ({ label, name, required, type, validationError }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "REGISTER_FIELD",
      payload: { name },
    });
  }, [dispatch, name]);

  const value = useSelector((state) => state.signUp.values[name] || "");
  const isValid = useSelector((state) => state.signUp.validatedFields[name]);
  const handleChange = (event) =>
    dispatch({
      type: "UPDATE_VALUE",
      payload: {
        name,
        value: event.target.value,
      },
    });
  const handleBlur = (event) =>
    dispatch({
      type: "UPDATE_VALIDATION_STATE",
      payload: {
        name,
        value: event.target.value,
      },
    });

  return (
    <TextareaField
      id={name}
      isInvalid={!isValid}
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      required={required}
      type={type}
      validationError={validationError}
      value={value}
    />
  );
};
