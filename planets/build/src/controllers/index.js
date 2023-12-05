"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const createPlanet_1 = __importDefault(require("./createPlanet"));
const deletePlanet_1 = __importDefault(require("./deletePlanet"));
const getPlanetById_1 = __importDefault(require("./getPlanetById"));
const getPlanets_1 = __importDefault(require("./getPlanets"));
const softPlanetDelete_1 = __importDefault(require("./softPlanetDelete"));
const updatePlanet_1 = __importDefault(require("./updatePlanet"));
exports.default = {
    createPlanet: (0, utils_1.catchedAsync)(createPlanet_1.default),
    deletePlanet: (0, utils_1.catchedAsync)(deletePlanet_1.default),
    getPlanetById: (0, utils_1.catchedAsync)(getPlanetById_1.default),
    getPlanets: (0, utils_1.catchedAsync)(getPlanets_1.default),
    softPlanetDelete: (0, utils_1.catchedAsync)(softPlanetDelete_1.default),
    updatePlanet: (0, utils_1.catchedAsync)(updatePlanet_1.default),
};
