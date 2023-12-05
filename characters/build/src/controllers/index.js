"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const createCharacter_1 = __importDefault(require("./createCharacter"));
const deleteCharacter_1 = __importDefault(require("./deleteCharacter"));
const getCharacterById_1 = __importDefault(require("./getCharacterById"));
const getCharacters_1 = __importDefault(require("./getCharacters"));
const softCharacterDelete_1 = __importDefault(require("./softCharacterDelete"));
const updateCharacter_1 = __importDefault(require("./updateCharacter"));
exports.default = {
    createCharacter: (0, utils_1.catchedAsync)(createCharacter_1.default),
    deleteCharacter: (0, utils_1.catchedAsync)(deleteCharacter_1.default),
    getCharacterById: (0, utils_1.catchedAsync)(getCharacterById_1.default),
    getCharacters: (0, utils_1.catchedAsync)(getCharacters_1.default),
    softCharacterDelete: (0, utils_1.catchedAsync)(softCharacterDelete_1.default),
    updateCharacter: (0, utils_1.catchedAsync)(updateCharacter_1.default),
};
