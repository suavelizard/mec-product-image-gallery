'use strict';
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
}
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(obj) {
        if (obj) {
            return res.status(statusCode).json(obj);
        }
        return null;
    };
}

module.exports = {
    handleError,
    respondWithResult
};