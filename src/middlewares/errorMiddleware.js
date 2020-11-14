const NotFoundError = (req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
};

const ServerError = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message || 'Internal Server Error',
  });
  next();
};

module.exports = { NotFoundError, ServerError };
