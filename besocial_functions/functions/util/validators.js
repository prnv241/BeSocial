exports.isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

isEmptys = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

isEmails = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateSignUp = (data) => {
  let errors = {};

  if (isEmptys(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmails(data.email)) {
    errors.email = "Must be a valid email";
  }
  if (isEmptys(data.password)) {
    errors.password = "Must not be empty";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  if (isEmptys(data.handle)) {
    errors.handle = "Must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLogin = (data) => {
  let errorss = {};

  if (isEmptys(data.email)) {
    errorss.email = "Must not be empty";
  }
  if (isEmptys(data.password)) {
    errorss.password = "Must not be empty";
  }

  return {
    errorss,
    valids: Object.keys(errorss).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmptys(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmptys(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  if (!isEmptys(data.location.trim())) userDetails.location = data.location;
  return userDetails;
};
