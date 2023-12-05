"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const characterValidation = (req, _res, next) => {
    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, } = req.body;
    if (!name ||
        !height ||
        !mass ||
        !hair_color ||
        !skin_color ||
        !eye_color ||
        !birth_year ||
        !gender ||
        !homeworld ||
        !films) {
        throw new utils_1.errors.ClientError('Missing required fields', 401);
    }
    return next();
};
exports.default = characterValidation;
