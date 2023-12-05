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
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const { gender, name } = req.query;
    if (gender) {
        const { data } = yield axios_1.default.get(`http://database:8004/Character?page=${page}&limit=${limit}&gender=${gender}`);
        return (0, utils_1.response)(res, 200, data);
    }
    else if (name) {
        const { data } = yield axios_1.default.get(`http://database:8004/Character?page=${page}&limit=${limit}&name=${name}`);
        return (0, utils_1.response)(res, 200, data);
    }
    else {
        const { data } = yield axios_1.default.get(`http://database:8004/Character?page=${page}&limit=${limit}`);
        return (0, utils_1.response)(res, 200, data);
    }
});
exports.default = getCharacters;
