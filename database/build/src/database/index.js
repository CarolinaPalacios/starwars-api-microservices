"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
const schemas_1 = __importDefault(require("./schemas"));
const conn = mongoose_1.default.createConnection(env_1.MONGO_URI);
const CharacterModel = conn.model('Character', schemas_1.default.character);
const FilmModel = conn.model('Film', schemas_1.default.film);
const PlanetModel = conn.model('Planet', schemas_1.default.planet);
const store = {
    Character: CharacterModel,
    Film: FilmModel,
    Planet: PlanetModel,
};
exports.default = store;
