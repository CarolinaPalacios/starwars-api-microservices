"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const planetValidation = (req, _res, next) => {
    const { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, residents, films, } = req.body;
    if (!name ||
        !rotation_period ||
        !orbital_period ||
        !diameter ||
        !climate ||
        !gravity ||
        !terrain ||
        !surface_water ||
        !residents ||
        !films) {
        throw new utils_1.errors.ClientError('Missing required fields', 401);
    }
    return next();
};
exports.default = planetValidation;
