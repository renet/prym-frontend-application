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

  span {
    color: #b00;
  }
`;
const Input = styled.input`
  border: solid 1px ${({ isInvalid }) => (isInvalid ? "#b00" : "#777")};
  border-radius: 2px;
  font-size: 1.2rem;
  height: 40px;
  margin-top: 5px;
  outline: none;
  padding: 0 10px;

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

export const InputField = ({
  id,
  isInvalid,
  label,
  name,
  onBlur,
  onChange,
  required,
  tabIndex,
  type = "text",
  validationError,
  value,
}) => {
  return (
    <Label htmlFor={id}>
      <p>
        {label}
        {required && <span> *</span>}
      </p>
      <Input
        id={id}
        name={name}
        isInvalid={isInvalid}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        tabIndex={tabIndex}
        type={type}
        value={value}
      />
      <ErrorMessage>{isInvalid && validationError}</ErrorMessage>
    </Label>
  );
};

export default ({
  label,
  name,
  required,
  tabIndex,
  type,
  validationError,
  validationRules = [],
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "REGISTER_FIELD",
      payload: { name, validationRules },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, name, JSON.stringify(validationRules)]);

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
    <InputField
      id={name}
      isInvalid={!isValid}
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      required={required}
      tabIndex={tabIndex}
      type={type}
      validationError={validationError}
      value={value}
    />
  );
};
