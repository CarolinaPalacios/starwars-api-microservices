"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = (0, express_1.Router)();
router.get('/', controllers_1.default.getFilms);
router.get('/:id', controllers_1.default.getFilmById);
router.post('/', middlewares_1.default.filmValidation, controllers_1.default.createFilm);
router.put('/:id', controllers_1.default.updateFilm);
router.put('/:id/soft', controllers_1.default.softFilmDelete);
router.delete('/:id', controllers_1.default.deleteFilm);
exports.default = router;
