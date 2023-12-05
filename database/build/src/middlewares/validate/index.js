"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateModel_1 = __importDefault(require("./validateModel"));
const validateFields_1 = __importDefault(require("./validateFields"));
exports.default = { validateModel: validateModel_1.default, validateFields: validateFields_1.default };
