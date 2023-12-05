"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchedAsync_1 = __importDefault(require("../utils/catchedAsync"));
const getDocumentList_1 = __importDefault(require("./getDocumentList"));
const getDocumentById_1 = __importDefault(require("./getDocumentById"));
const insertDocument_1 = __importDefault(require("./insertDocument"));
const updateDocument_1 = __importDefault(require("./updateDocument"));
const softDocumentDelete_1 = __importDefault(require("./softDocumentDelete"));
const deleteDocument_1 = __importDefault(require("./deleteDocument"));
exports.default = {
    getDocumentList: (0, catchedAsync_1.default)(getDocumentList_1.default),
    getDocumentById: (0, catchedAsync_1.default)(getDocumentById_1.default),
    insertDocument: (0, catchedAsync_1.default)(insertDocument_1.default),
    updateDocument: (0, catchedAsync_1.default)(updateDocument_1.default),
    softDocumentDelete: (0, catchedAsync_1.default)(softDocumentDelete_1.default),
    deleteDocument: (0, catchedAsync_1.default)(deleteDocument_1.default),
};
