const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateSignupData = (userData) => {
  let errors = {};
  if (isEmpty(userData.email)) {
    errors.email = "Must not be empty!";
  } else if (!isEmail(userData.email)) {
    errors.email = "Must be a valid email!";
  }

  if (isEmpty(userData.username)) {
    errors.username = "Must not be empty!";
  }

  if (isEmpty(userData.password)) {
    errors.password = "Must not be empty!";
  }
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = "Passwords must match!";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (userData) => {
  let errors = {};

  if (isEmpty(userData.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(userData.email)) {
    errors.email = "Must be a valid email!";
  }
  if (isEmpty(userData.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};
  let errors = {};
  if (isEmpty(data.phone)) {
    errors.phone = "Must not be empty";
  } else {
    userDetails.phone = data.phone;
  }
  if (isEmpty(data.location)) {
    errors.location = "Must not be empty";
  } else {
    userDetails.location = data.location;
  }

  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
    userDetails,
  };
};
