function errorHandler(err, req, res, next) {
  console.log(err);
  let status = 500;
  let message = `Internal Server Error`;

  if (err.name === "Forbidden") {
    status = 403;
    message = `You aren't authorized`;
  } else if (err.name === "SequelizeValidationError") {
    // const errorMsg = err.errors.map((error) => {
    //   return error.message;
    // });
    const errorMsg = err.errors[0].message;
    status = 400;
    message = errorMsg;
  } else if (error.errors[0].validatorKey === "isEmail") {
    message = "Invalid email format";
    statusCode = 400;
  } else if (err.name === `Email Empty`) {
    status = 400;
    message = `Email can't be Empty`;
  } else if (err.name === `Password Empty`) {
    status = 400;
    message = `Password can't be empty`;
  } else if (err.name === "InvalidLogin") {
    status = 401;
    message = `Invalid email/password`;
  } else if (err.name === "InvalidId") {
    status = 404;
    message = `Error Data Not Found`;
  } else if (err.name === "InvalidRole") {
    status = 403;
    message = `Role Invalid`;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    // const errorMsg = err.errors[0].message;
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "BookmarkCreated") {
    status = 400;
    message = `Bookmark Already Created`;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
