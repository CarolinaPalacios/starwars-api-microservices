"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../../utils/errors"));
const validateFields = (req, _res, next) => {
    const { model } = req.params;
    const fieldsToCheck = getFieldsToCheck(model);
    if (!checkRequiredFields(req.body, fieldsToCheck)) {
        throw new errors_1.default.ClientError('Missing required fields', 401);
    }
    return next();
};
const getFieldsToCheck = (model) => {
    const fieldsMap = {
        Character: [
            'name',
            'height',
            'mass',
            'hair_color',
            'skin_color',
            'eye_color',
            'birth_year',
            'gender',
            'homeworld',
            'films',
        ],
        Film: [
            'title',
            'opening_crawl',
            'director',
            'producer',
            'release_date',
            'characters',
            'planets',
        ],
        Planet: [
            'name',
            'rotation_period',
            'orbital_period',
            'diameter',
            'climate',
            'gravity',
            'terrain',
            'surface_water',
            'residents',
            'films',
        ],
    };
    return fieldsMap[model] || [];
};
const checkRequiredFields = (body, requiredFields) => {
    return requiredFields.every((field) => body[field] !== undefined && body[field] !== null);
};
exports.default = validateFields;
