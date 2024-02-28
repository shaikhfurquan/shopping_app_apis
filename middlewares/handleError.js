
export const handleErrorMiddleware = (res, statusCode, message, error) => {
  res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error',
    error: error ? error.message : null
  });
}


