"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./src/server"));
const PORT = 8002;
server_1.default.listen(PORT, () => {
    console.log(`Films service listening on port ${PORT}`);
});
