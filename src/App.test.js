import React from "react";
import { render } from "./utils/testing-utils";
import App from "./App";

const initialState = {
  signUp: {
    fieldsToValidate: {},
    validatedFields: {},
    isValid: false,
    values: {},
  },
};

test("renders form", () => {
  const { getByText } = render(<App />, { initialState });
  const linkElement = getByText(/Create an Account/);
  expect(linkElement).toBeInTheDocument();
});
