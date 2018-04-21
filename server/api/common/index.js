'use strict';
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return err => {
        return res.status(statusCode).send(err);
    };
}
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return entity => {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

module.exports = {
    handleError,
    respondWithResult
};