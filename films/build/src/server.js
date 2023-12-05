"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./handlers/errorHandler"));
const utils_1 = require("./utils");
const server = (0, express_1.default)();
server.use((0, morgan_1.default)('dev'));
server.use(express_1.default.json());
server.use('/films', routes_1.default);
server.use('*', () => {
    throw new utils_1.errors.ClientError('Not found', 404);
});
server.use(errorHandler_1.default);
exports.default = server;
