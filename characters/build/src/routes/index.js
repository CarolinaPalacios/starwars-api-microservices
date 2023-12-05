"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = (0, express_1.Router)();
router.get('/', controllers_1.default.getCharacters);
router.get('/:id', controllers_1.default.getCharacterById);
router.post('/', middlewares_1.default.characterValidation, controllers_1.default.createCharacter);
router.put('/:id', controllers_1.default.updateCharacter);
router.put('/:id/soft', controllers_1.default.softCharacterDelete);
router.delete('/:id', controllers_1.default.deleteCharacter);
exports.default = router;
