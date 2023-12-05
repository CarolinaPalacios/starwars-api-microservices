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
const enum_1 = require("../../types/enum");
const filmSchema = new mongoose_1.Schema({
    _id: String,
    title: String,
    opening_crawl: String,
    director: {
        type: String,
        enum: Object.values(enum_1.Director),
    },
    producer: String,
    release_date: Date,
    characters: [
        {
            type: String,
            ref: 'Character',
        },
    ],
    planets: [
        {
            type: String,
            ref: 'Planet',
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
filmSchema.statics.list = function (skip = 0, limit = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield this.countDocuments({ isDeleted: false });
        const films = yield this.find({ isDeleted: false })
            .populate('characters', { _id: 1, name: 1 })
            .populate('planets', { _id: 1, name: 1 })
            .skip(skip)
            .limit(limit);
        const currentPage = Math.floor(skip / limit) + 1;
        const totalPages = Math.ceil(total / limit);
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        return {
            total,
            films,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
        };
    });
};
filmSchema.statics.get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findById(id)
            .populate('characters', { _id: 1, name: 1 })
            .populate('planets', { _id: 1, name: 1 });
    });
};
filmSchema.statics.insert = function (film) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create(film);
    });
};
filmSchema.statics.update = function (id, filmData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndUpdate(id, filmData, { new: true });
    });
};
filmSchema.statics.delete = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndDelete(id);
    });
};
filmSchema.statics.softDelete = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    });
};
exports.default = filmSchema;
