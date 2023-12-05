"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({
        error: true,
        message: err.message,
    });
};
exports.default = errorHandler;
