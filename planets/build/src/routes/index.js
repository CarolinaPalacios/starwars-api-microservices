"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = (0, express_1.Router)();
router.get('/', controllers_1.default.getPlanets);
router.get('/:id', controllers_1.default.getPlanetById);
router.post('/', middlewares_1.default.planetValidation, controllers_1.default.createPlanet);
router.put('/:id', controllers_1.default.updatePlanet);
router.put('/:id/soft', controllers_1.default.softPlanetDelete);
router.delete('/:id', controllers_1.default.deletePlanet);
exports.default = router;
