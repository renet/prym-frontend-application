import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import TextareaField from "./TextareaField";
import { Button } from "./Button";

const FormWrapper = styled.form`
  align-items: stretch;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 40px 20px;

  @media (min-width: 640px) {
    margin: 20px 40px 40px;
  }

  @media (min-width: 1080px) {
    margin: 20px auto;
    width: 70%;
  }
`;
const Headline = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 20px 0 40px;
  text-align: center;
  width: 100%;
`;
const FormColumn = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
const Hint = styled.p`
  color: #777;
  font-size: 0.7rem;
  margin-top: 20px;

  span {
    color: #b00;
  }
`;
const AddressWrapper = styled.div`
  height: ${({ visible }) => (visible ? "auto" : 0)};
  margin-bottom: 20px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transition: opacity 300ms ease-in-out;

  @media (min-width: 768px) {
    height: auto;
  }
`;
const FormBottom = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  width: 100%;
`;

export const RegistrationForm = () => {
  const isValid = useSelector((state) => state.signUp.isValid);
  const showAddress = useSelector((state) => state.signUp.values.showAddress);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("form submit");
  };

  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      <Headline>Create an Account</Headline>
      <FormColumn>
        <InputField
          label="First name"
          name="firstName"
          required
          validationError="Please enter at least 2 characters."
        />
        <InputField
          label="Last name"
          name="lastName"
          required
          validationError="Please enter at least 2 characters."
        />
        <InputField label="Nick name" name="nickName" />
        <InputField
          label="Email"
          name="email"
          type="email"
          required
          validationError="Please enter a valid e-mail address."
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          required
          validationError="The password must be at least 6 characters long, containing at least 2 digits."
        />
        <InputField
          label="Repeat password"
          name="repeatPassword"
          type="password"
          required
          validationError="The passwords do not match."
        />
        <CheckboxField label="Show Address" name="showAddress" />
      </FormColumn>
      <FormColumn>
        <div>
          <AddressWrapper visible={showAddress}>
            <InputField
              label="Street"
              name="street"
              required
              tabIndex={showAddress ? undefined : -1}
              validationError="Please enter at least 4 characters."
            />
            <InputField
              label="House/Apartment"
              name="streetNo"
              tabIndex={showAddress ? undefined : -1}
            />
            <InputField
              label="ZIP"
              name="zip"
              type="number"
              required
              tabIndex={showAddress ? undefined : -1}
              validationError="Please enter exactly 5 digits."
            />
            <InputField
              label="City"
              name="city"
              required
              tabIndex={showAddress ? undefined : -1}
              validationError="Please enter at least 4 characters."
            />
          </AddressWrapper>
          <TextareaField label="Additional information" name="more" />
        </div>
      </FormColumn>
      <FormBottom>
        <Hint>
          <span>*</span> Required fields
        </Hint>
        <Button disabled={!isValid} type="submit">
          Submit registration
        </Button>
      </FormBottom>
    </FormWrapper>
  );
};
