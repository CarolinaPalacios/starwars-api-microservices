"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createFilm_1 = __importDefault(require("./createFilm"));
const deleteFilm_1 = __importDefault(require("./deleteFilm"));
const getFilmById_1 = __importDefault(require("./getFilmById"));
const getFilms_1 = __importDefault(require("./getFilms"));
const softFilmDelete_1 = __importDefault(require("./softFilmDelete"));
const updateFilm_1 = __importDefault(require("./updateFilm"));
const utils_1 = require("../utils");
exports.default = {
    createFilm: (0, utils_1.catchedAsync)(createFilm_1.default),
    deleteFilm: (0, utils_1.catchedAsync)(deleteFilm_1.default),
    getFilmById: (0, utils_1.catchedAsync)(getFilmById_1.default),
    getFilms: (0, utils_1.catchedAsync)(getFilms_1.default),
    softFilmDelete: (0, utils_1.catchedAsync)(softFilmDelete_1.default),
    updateFilm: (0, utils_1.catchedAsync)(updateFilm_1.default),
};
