"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (res, statusCode, document, model) => {
    res.status(statusCode).json({ [model]: document });
};
exports.default = response;
