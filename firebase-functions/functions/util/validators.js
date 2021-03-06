const isEmpty = string => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateSignupData = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password) || data.password.trim().length < 6) {
    errors.password = "Must be at least 6 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceEntry = data => {
  console.log(data);
  let entryDetails = {};

  if (!isEmpty(data.sum.toString())) entryDetails.sum = data.sum;
  if (!isEmpty(data.details.trim())) entryDetails.details = data.details;
  if (!isEmpty(data.category.trim())) entryDetails.category = data.category;
  if (!isEmpty(data.date)) entryDetails.date = data.date;

  return entryDetails;
};
