"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getModelData(response, model) {
    switch (model) {
        case 'Character':
            return response.characters;
        case 'Film':
            return response.films;
        case 'Planet':
            return response.planets;
        default:
            throw new Error('Model not found');
    }
}
exports.default = getModelData;
