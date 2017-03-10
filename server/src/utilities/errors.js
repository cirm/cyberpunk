const serverError = (message = 'Server broken', status = 500) => {
  const err = new Error();
  err.message = message;
  err.status = status;
  return err;
};

const authenticationError = (message = 'Wrong username/password combination') => {
  const err = new Error();
  err.message = `Authentication error: ${message}`;
  return err;
};

const tokenError = (message = 'Unknown error') => {
  const err = new Error();
  err.message = `Token verification error: ${message}`;
  return err
};

module.exports = {
  serverError,
  tokenError,
  authenticationError,
};
