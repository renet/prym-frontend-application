import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Label = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;

  &:not(:first-child) {
    margin-top: 20px;
  }
`;
const Input = styled.input`
  cursor: pointer;
  margin: 0 10px 0 0;
  padding: 5px 10px;
  position: relative;
  width: 20px;
  height: 20px;

  &:before {
    background: #fff;
    content: "";
    pointer-events: none;
    position: absolute;
    border: solid 1px ${({ isInvalid }) => (isInvalid ? "#d00" : "#777")};
    border-radius: 2px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  &:checked:after {
    background: #777;
    content: "";
    pointer-events: none;
    position: absolute;
    top: 4px;
    right: 4px;
    left: 4px;
    bottom: 4px;
  }
`;
const ErrorMessage = styled.p`
  color: #b00;
  font-size: 0.7rem;
  height: 22px;
  margin-top: 3px;
  width: 100%;
`;

export const CheckboxField = ({
  checked,
  id,
  isInvalid,
  label,
  name,
  onBlur,
  onChange,
  required,
  validationError,
}) => {
  return (
    <Label htmlFor={id}>
      <Input
        checked={checked}
        id={id}
        isInvalid={isInvalid}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        type="checkbox"
      />
      {label}
      <ErrorMessage>{isInvalid && validationError}</ErrorMessage>
    </Label>
  );
};

export default ({ label, name, required, validationError }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "REGISTER_FIELD",
      payload: { name },
    });
  }, [dispatch, name]);

  const checked = useSelector((state) => state.signUp.values[name]);
  const isValid = useSelector((state) => state.signUp.validatedFields[name]);
  const handleValueChange = (event) =>
    dispatch({
      type: "UPDATE_VALUE",
      payload: {
        name,
        value: event.target.checked,
      },
    });
  const handleBlur = (event) =>
    dispatch({
      type: "UPDATE_VALIDATION_STATE",
      payload: {
        name,
        value: event.target.checked,
      },
    });

  return (
    <CheckboxField
      checked={checked}
      id={name}
      isInvalid={!isValid}
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleValueChange}
      required={required}
      validationError={validationError}
    />
  );
};
