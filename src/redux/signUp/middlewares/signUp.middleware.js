import { validateField } from "./validation";

const validateAndDispatch = (payload, dispatch, getState) => {
  const isValid = validateField(payload, getState);

  dispatch({
    type: "UPDATE_VALIDATION_RESULT",
    payload: { name: payload.name, isValid },
  });
};

const signUpMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (
    (action.type === "UPDATE_VALUE" &&
      getState().signUp.fieldsToValidate[action.payload.name]) ||
    action.type === "UPDATE_VALIDATION_STATE"
  ) {
    validateAndDispatch(action.payload, dispatch, getState);
  }

  if (action.type === "UPDATE_VALIDATION_RESULT" && action.payload.isValid) {
    const currentState = getState();
    const isFormInvalid = Object.keys(currentState.signUp.validatedFields)
      .filter((name) => name !== action.payload.name)
      .find(
        (name) =>
          !validateField(
            { name, value: currentState.signUp.values[name] || "" },
            getState
          )
      );

    dispatch({ type: "UPDATE_FORM_VALID_STATE", payload: !isFormInvalid });
  }

  if (action.type === "SUBMIT_FORM") {
    // TODO: here's the place for an async service call for example...
  }

  return next(action);
};

export { signUpMiddleware };
