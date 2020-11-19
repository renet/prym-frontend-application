export const signUpReducer = (
  state = {
    fieldsToValidate: {},
    validatedFields: {},
    isValid: false,
    values: {},
  },
  { type, payload }
) => {
  switch (type) {
    case "REGISTER_FIELD":
      return {
        ...state,
        validatedFields: {
          ...state.validatedFields,
          [payload.name]: true,
        },
      };
    case "UPDATE_FORM_VALID_STATE":
      return { ...state, isValid: payload };
    case "UPDATE_VALUE":
      return {
        ...state,
        values: { ...state.values, [payload.name]: payload.value },
      };
    case "UPDATE_VALIDATION_RESULT":
      return {
        ...state,
        validatedFields: {
          ...state.validatedFields,
          [payload.name]: payload.isValid,
        },
        isValid: payload.isValid ? state.isValid : false,
      };
    case "UPDATE_VALIDATION_STATE":
      return {
        ...state,
        fieldsToValidate: { ...state.fieldsToValidate, [payload.name]: true },
      };
    default:
      return state;
  }
};
