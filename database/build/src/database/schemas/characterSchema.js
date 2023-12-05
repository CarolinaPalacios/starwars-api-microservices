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
const characterSchema = new mongoose_1.Schema({
    _id: String,
    name: String,
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: {
        type: String,
        enum: Object.values(enum_1.Gender),
    },
    homeworld: {
        type: String,
        ref: 'Planet',
    },
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
characterSchema.statics.list = function (skip = 0, limit = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield this.countDocuments({ isDeleted: false });
        const characters = yield this.find({ isDeleted: false })
            .populate('homeworld', { _id: 1, name: 1 })
            .populate('films', { _id: 1, title: 1 })
            .skip(skip)
            .limit(limit);
        const currentPage = Math.floor(skip / limit) + 1;
        const totalPages = Math.ceil(total / limit);
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        return {
            total,
            characters,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
        };
    });
};
characterSchema.statics.get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findById(id, { isDeleted: false })
            .populate('homeworld', { _id: 1, name: 1 })
            .populate('films', {
            _id: 1,
            title: 1,
        });
    });
};
characterSchema.statics.insert = function (character) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create(character);
    });
};
characterSchema.statics.update = function (id, characterData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndUpdate(id, characterData, { new: true });
    });
};
characterSchema.statics.delete = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndDelete(id);
    });
};
characterSchema.statics.softDelete = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    });
};
characterSchema.statics.filterBy = function (type, value, skip = 0, limit = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        let total;
        let characters;
        if (type === 'gender') {
            total = yield this.countDocuments({
                gender: value,
                isDeleted: false,
            });
            characters = yield this.find({
                gender: value,
                isDeleted: false,
            })
                .populate('homeworld', {
                _id: 1,
                name: 1,
            })
                .populate('films', {
                _id: 1,
                title: 1,
            })
                .skip(skip)
                .limit(limit);
        }
        else if (type === 'name') {
            total = yield this.countDocuments({
                name: { $regex: value, $options: 'i' },
                isDeleted: false,
            });
            characters = yield this.find({
                name: { $regex: value, $options: 'i' },
                isDeleted: false,
            })
                .populate('homeworld', {
                _id: 1,
                name: 1,
            })
                .populate('films', {
                _id: 1,
                title: 1,
            })
                .skip(skip)
                .limit(limit);
        }
        const currentPage = Math.floor(skip / limit) + 1;
        const totalPages = Math.ceil(total / limit);
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        return {
            total,
            characters,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
        };
    });
};
exports.default = characterSchema;
