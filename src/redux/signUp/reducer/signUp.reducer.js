const initialState = {
  fieldsToValidate: {},
  validatedFields: {},
  validationRules: {},
  isValid: false,
  values: {},
};

export const signUpReducer = (
  state = { ...initialState },
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
        validationRules: {
          ...state.validationRules,
          [payload.name]: payload.validationRules,
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
    case "SUBMIT_FORM":
      // TODO: maybe reset form with something like:
      // return { ...initialState };
      return state;
    default:
      return state;
  }
};
