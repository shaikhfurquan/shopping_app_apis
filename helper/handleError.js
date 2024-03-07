
// catch block error handler function
export const handleErrorFunction = (res, statusCode, message, error) => {
  return res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error',
    error: error ? error.message : null
  });
}



//Not found/validation error Function function
export const handleNotFoundFunction = (res, message) => {
  return res.status(404).json({
    success: false,
    message: message || 'Not Found',
  });
};


//handle cast error
export const handleCastErrorFunction = (res, message) => {
  return res.status(404).json({
    success: false,
    message: message || 'Invalid Id'
  });
};