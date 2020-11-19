import { RULES, VALIDATORS } from "../../../utils/validation-utils";

export const validateField = ({ name: fieldName, value }, getState) => {
  const signUpState = getState().signUp;
  const rules = signUpState.validationRules[fieldName];

  if (rules) {
    return !rules.find(({ ruleName, options }) => {
      switch (ruleName) {
        case RULES.MATCH_FIELD_VALUE:
          return !VALIDATORS[ruleName](value, {
            fieldValue: signUpState.values[options.fieldName],
          });
        case RULES.EMAIL:
        case RULES.MAX_LENGTH:
        case RULES.MIN_LENGTH:
        case RULES.PASSWORD:
          return !VALIDATORS[ruleName](value, options);
        default:
          // no failing validator
          return false;
      }
    });
  }

  return true;
};
