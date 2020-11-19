export const RULES = {
  EMAIL: "EMAIL",
  MATCH_FIELD_VALUE: "MATCH_FIELD_VALUE",
  MIN_LENGTH: "MIN_LENGTH",
  MAX_LENGTH: "MAX_LENGTH",
  PASSWORD: "PASSWORD",
};

export const VALIDATORS = {
  [RULES.MATCH_FIELD_VALUE]: (value, options = {}) => {
    const { fieldValue = "" } = options;

    return value === fieldValue;
  },
  [RULES.MAX_LENGTH]: (value, options = {}) => {
    const { maxLength = 10 } = options;

    return value.length <= maxLength;
  },
  [RULES.MIN_LENGTH]: (value, options = {}) => {
    const { minLength = 2 } = options;

    return value.length >= minLength;
  },
  [RULES.EMAIL]: (value) => {
    return !!value.match(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
  },
  [RULES.PASSWORD]: (value, options = {}) => {
    const { minDigits = 2 } = options;
    const regex = new RegExp(`(?:.*?[0-9]){${minDigits}}.*`);

    return !!value.match(regex);
  },
};
