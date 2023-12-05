"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getModelData_1 = __importDefault(require("./getModelData"));
const getListResponse = (res, statusCode, response, model, page) => {
    const totalPages = response.totalPages || 1;
    const currentPage = page > totalPages ? totalPages : page;
    res.status(statusCode).json(Object.assign(Object.assign(Object.assign({ total: response.total, currentPage }, (page > 1 && { prevPage: currentPage - 1 })), (page < totalPages && { nextPage: currentPage + 1 })), { totalPages, [model]: (0, getModelData_1.default)(response, model) }));
};
exports.default = getListResponse;
