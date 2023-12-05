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
const getDocumentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { model } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { gender, name } = req.query;
    let response;
    if (model === 'Character' && gender) {
        response = yield database_1.default.Character.filterBy('gender', gender);
    }
    else if (model === 'Character' && name) {
        response = yield database_1.default.Character.filterBy('name', name);
    }
    else {
        response = yield database_1.default[model].list((page - 1) * limit, limit);
    }
    if (response.total === 0)
        throw new errors_1.default.ClientError('Document not found', 404);
    (0, response_1.getListResponse)(res, 200, response, model, page);
});
exports.default = getDocumentList;
