const isEmpty = (value) => {
  return !value || value.trim() === "";
}

const validateCredential = (email, password) => {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
}

const validateUserData = (email, password, name, street, pincode, city) => {
  return (
    validateCredential(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(pincode) &&
    !isEmpty(city)
  );
}

const emailIsConfirmed = (email, confirmEmail) => {
  return email === confirmEmail;
}

module.exports = {
  validateUserData,
  emailIsConfirmed,
};
