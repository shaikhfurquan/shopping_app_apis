
// catch block error handler middleware function
export const handleErrorMiddlewareFunction = (res, statusCode, message, error) => {
  return res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error',
    error: error ? error.message : null
  });
}



//Not found/validation error middlewareFunction function
export const handleNotFoundMiddlewareFunction = (res, message) => {
  return res.status(404).json({
    success: false,
    message: message || 'Not Found',
  });
};


//handle cast error
export const handleCastErrorMiddlewareFunction = (res, message) => {
  return res.status(404).json({
    success: false,
    message: message || 'Invalid Id'
  });
};