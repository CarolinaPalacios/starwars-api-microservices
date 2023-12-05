"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const characterSchema_1 = __importDefault(require("./characterSchema"));
const filmSchema_1 = __importDefault(require("./filmSchema"));
const planetSchema_1 = __importDefault(require("./planetSchema"));
exports.default = { character: characterSchema_1.default, film: filmSchema_1.default, planet: planetSchema_1.default };
