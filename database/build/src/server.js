"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./handlers/errorHandler"));
const errors_1 = __importDefault(require("./utils/errors"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
server.use(routes_1.default);
server.use('*', () => {
    throw new errors_1.default.ClientError('Route not found', 404);
});
server.use(errorHandler_1.default);
exports.default = server;
