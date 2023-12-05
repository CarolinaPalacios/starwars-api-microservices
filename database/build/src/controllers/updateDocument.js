"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const response_1 = require("../utils/response");
const errors_1 = __importDefault(require("../utils/errors"));
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { model } = req.params;
    const { id } = req.params;
    const result = yield database_1.default[model].update(id, req.body);
    if (result)
        (0, response_1.response)(res, 200, result, model);
    else
        throw new errors_1.default.ClientError('Document not found', 404);
});
exports.default = updateDocument;
