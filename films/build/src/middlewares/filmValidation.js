"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const filmValidation = (req, _res, next) => {
    const { title, opening_crawl, director, producer, release_date, characters, planets, } = req.body;
    if (!title ||
        !opening_crawl ||
        !director ||
        !producer ||
        !release_date ||
        !characters ||
        !planets) {
        throw new utils_1.errors.ClientError('Missing required fields', 401);
    }
    return next();
};
exports.default = filmValidation;
