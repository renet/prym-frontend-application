import React from "react";
import { fireEvent, render } from "../utils/testing-utils";
import { RegistrationForm } from "./RegistrationForm";

const validValues = {
  firstName: "Jane",
  lastName: "Doe",
  nickName: "Janie",
  email: "jane@doe.com",
  password: "test1234",
  repeatPassword: "test1234",
  showAddress: true,
  street: "5th Avenue",
  streetNo: "414",
  zip: "12345",
  city: "New York City",
  more: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
};
const fieldStatesTrue = {
  firstName: true,
  lastName: true,
  nickName: true,
  email: true,
  password: true,
  repeatPassword: true,
  showAddress: true,
  street: true,
  streetNo: true,
  zip: true,
  city: true,
  more: true,
};
const initialState = {
  signUp: {
    fieldsToValidate: {},
    validatedFields: {},
    isValid: false,
    values: {},
  },
};
const validState = {
  signUp: {
    fieldsToValidate: { ...fieldStatesTrue },
    validatedFields: { ...fieldStatesTrue },
    isValid: true,
    values: { ...validValues },
  },
};

const testForInputValidation = (
  labelText,
  inputValues,
  errorMessage,
  formElement = "input"
) => {
  const { getByLabelText, getByText } = render(<RegistrationForm />, {
    initialState: { ...validState },
  });
  const inputField = getByLabelText(labelText, { selector: formElement });
  const button = getByText(/Submit registration/);

  inputValues.forEach((value) => {
    fireEvent.change(inputField, {
      target: { value: value },
    });

    expect(getByText(errorMessage)).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });
};

describe("registration form", () => {
  it("contains all relevant form elements", () => {
    const { getByLabelText, getByText } = render(<RegistrationForm />, {
      initialState: { ...initialState },
    });
    expect(
      getByLabelText(/First name/, { selector: "input" })
    ).toBeInTheDocument();
    expect(
      getByLabelText(/Last name/, { selector: "input" })
    ).toBeInTheDocument();
    expect(
      getByLabelText(/Nick name/, { selector: "input" })
    ).toBeInTheDocument();
    expect(getByLabelText(/Email/, { selector: "input" })).toBeInTheDocument();
    expect(
      getByLabelText(/Password/, { selector: "input" })
    ).toBeInTheDocument();
    expect(
      getByLabelText(/Repeat password/, { selector: "input" })
    ).toBeInTheDocument();
    expect(
      getByLabelText(/Show Address/, { selector: "input" })
    ).toBeInTheDocument();
    expect(getByLabelText(/Street/, { selector: "input" })).toBeInTheDocument();
    expect(
      getByLabelText(/House\/Apartment/, { selector: "input" })
    ).toBeInTheDocument();
    expect(getByLabelText(/ZIP/, { selector: "input" })).toBeInTheDocument();
    expect(getByLabelText(/City/, { selector: "input" })).toBeInTheDocument();
    expect(
      getByLabelText(/Additional information/, { selector: "textarea" })
    ).toBeInTheDocument();
    expect(getByText(/Submit registration/)).toBeInTheDocument();
  });

  it("should not be initially submittable", () => {
    const { getByText } = render(<RegistrationForm />, {
      initialState: { ...initialState },
    });
    const button = getByText(/Submit registration/);
    expect(button).toHaveAttribute("disabled");
  });

  it("should be submittable after all required fields got filled with valid values", () => {
    const { getByLabelText, getByText } = render(<RegistrationForm />, {
      initialState: { ...initialState },
    });

    const firstNameInput = getByLabelText(/First name/, { selector: "input" });
    fireEvent.change(firstNameInput, {
      target: { value: validValues.firstName },
    });
    fireEvent.blur(firstNameInput, {
      target: { value: validValues.firstName },
    });

    const lastNameInput = getByLabelText(/Last name/, { selector: "input" });
    fireEvent.change(lastNameInput, {
      target: { value: validValues.lastName },
    });
    fireEvent.blur(lastNameInput, { target: { value: validValues.lastName } });

    const emailInput = getByLabelText(/Email/, { selector: "input" });
    fireEvent.change(emailInput, {
      target: { value: validValues.email },
    });
    fireEvent.blur(emailInput, { target: { value: validValues.email } });

    const passwordInput = getByLabelText(/Password/, { selector: "input" });
    fireEvent.change(passwordInput, {
      target: { value: validValues.password },
    });
    fireEvent.blur(passwordInput, { target: { value: validValues.password } });

    const repeatPassordInput = getByLabelText(/Repeat password/, {
      selector: "input",
    });
    fireEvent.change(repeatPassordInput, {
      target: { value: validValues.repeatPassword },
    });
    fireEvent.blur(repeatPassordInput, {
      target: { value: validValues.repeatPassword },
    });

    const streetInput = getByLabelText(/Street/, { selector: "input" });
    fireEvent.change(streetInput, {
      target: { value: validValues.street },
    });
    fireEvent.blur(streetInput, { target: { value: validValues.street } });

    const zipInput = getByLabelText(/ZIP/, { selector: "input" });
    fireEvent.change(zipInput, {
      target: { value: validValues.zip },
    });
    fireEvent.blur(zipInput, { target: { value: validValues.zip } });

    const cityInput = getByLabelText(/City/, { selector: "input" });
    fireEvent.change(cityInput, {
      target: { value: validValues.city },
    });
    fireEvent.blur(cityInput, { target: { value: validValues.city } });

    const button = getByText(/Submit registration/);
    expect(button).not.toHaveAttribute("disabled");
  });

  it("should show error message only after first blur", async () => {
    const { getByLabelText, queryByText } = render(<RegistrationForm />, {
      initialState: { ...initialState },
    });
    const inputField = getByLabelText(/First name/, { selector: "input" });

    fireEvent.change(inputField, {
      target: { value: "B" },
    });

    expect(
      queryByText("Please enter at least 2 characters.")
    ).not.toBeInTheDocument();

    fireEvent.blur(inputField, { target: { value: "B" } });

    expect(
      queryByText("Please enter at least 2 characters.")
    ).toBeInTheDocument();
  });

  it("should be submittable with an initially valid state", () => {
    const { getByText } = render(<RegistrationForm />, {
      initialState: { ...validState },
    });
    const button = getByText(/Submit registration/);
    expect(button).not.toHaveAttribute("disabled");
  });

  it("should validate wrong input for first name", () => {
    testForInputValidation(
      /First name/,
      ["", "J"],
      "Please enter at least 2 characters."
    );
  });

  it("should validate wrong input for last name", () => {
    testForInputValidation(
      /Last name/,
      ["", "D"],
      "Please enter at least 2 characters."
    );
  });

  it("should validate wrong input for email", () => {
    testForInputValidation(
      /Email/,
      ["", "jane@doe.c"],
      "Please enter a valid e-mail address."
    );
  });

  it("should validate wrong input for password", () => {
    testForInputValidation(
      /Password/,
      ["", "Password1", "Pwd12"],
      "The password must be at least 6 characters long, containing at least 2 digits."
    );
  });

  it("should validate wrong input for repeated password", () => {
    testForInputValidation(
      /Repeat password/,
      ["", "test12345"],
      "The passwords do not match."
    );
  });

  it("should validate wrong input for street", () => {
    testForInputValidation(
      /Street/,
      ["", "Str"],
      "Please enter at least 4 characters."
    );
  });

  it("should validate wrong input for ZIP", () => {
    testForInputValidation(
      /ZIP/,
      ["", "1234", "123456"],
      "Please enter exactly 5 digits."
    );
  });

  it("should validate wrong input for city", () => {
    testForInputValidation(
      /City/,
      ["", "Ber"],
      "Please enter at least 4 characters."
    );
  });
});
