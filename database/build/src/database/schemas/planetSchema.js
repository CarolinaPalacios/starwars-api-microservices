"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planetSchema = new mongoose_1.Schema({
    _id: String,
    name: String,
    rotation_period: String,
    orbital_period: String,
    diameter: String,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    residents: [
        {
            type: String,
            ref: 'Character',
        },
    ],
    films: [
        {
            type: String,
            ref: 'Film',
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
planetSchema.statics.list = function (skip = 0, limit = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield this.countDocuments({ isDeleted: false });
        const planets = yield this.find({ isDeleted: false })
            .populate('residents', { _id: 1, name: 1 })
            .populate('films', {
            _id: 1,
            title: 1,
        })
            .skip(skip)
            .limit(limit);
        const currentPage = Math.floor(skip / limit) + 1;
        const totalPages = Math.ceil(total / limit);
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        return {
            total,
            planets,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
        };
    });
};
planetSchema.statics.get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findById(id)
            .populate('residents', { _id: 1, name: 1 })
            .populate('films', {
            _id: 1,
            title: 1,
        });
    });
};
planetSchema.statics.insert = function (planet) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create(planet);
    });
};
planetSchema.statics.update = function (id, planetData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndUpdate(id, planetData, { new: true });
    });
};
planetSchema.statics.delete = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndDelete(id);
    });
};
planetSchema.statics.softDelete = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    });
};
exports.default = planetSchema;
