const isValidPassword = (string) =>
  // the regexp checks whether the string contains at least two numbers
  string.length >= 6 && string.match(/(?:.*?[0-9]){2}.*/);
const isValidEmail = (string) =>
  string.match(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );

export const validateField = ({ name, value }, getState) => {
  switch (name) {
    case "firstName":
    case "lastName":
      return value.length >= 2;
    case "password":
      return !!isValidPassword(value);
    case "repeatPassword":
      return (
        isValidPassword(value) && value === getState().signUp.values.password
      );
    case "email":
      return !!isValidEmail(value);
    case "street":
    case "city":
      return value.length >= 4;
    case "zip":
      return value.length === 5;
    default:
      return true;
  }
};
