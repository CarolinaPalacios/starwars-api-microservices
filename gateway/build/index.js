"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use('/characters', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://characters:8001',
    changeOrigin: true,
}));
app.use('/films', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://films:8002',
    changeOrigin: true,
}));
app.use('/planets', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://planets:8003', changeOrigin: true }));
app.listen(8000, () => {
    console.log('Gateway on port 8000');
});
