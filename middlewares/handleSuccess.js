
//response middleware functions
export const handleSuccessMiddleware = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        message: message || 'Success',
        ...data,
    });
};

