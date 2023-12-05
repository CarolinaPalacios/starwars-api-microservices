"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: false,
        data,
    });
};
exports.default = response;
