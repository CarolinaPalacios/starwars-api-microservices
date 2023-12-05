"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateModel = (req, _res, next) => {
    const { model } = req.params;
    if (['Character', 'Film', 'Planet'].includes(model)) {
        return next();
    }
    else {
        throw Error('Invalid model');
    }
};
exports.default = validateModel;
