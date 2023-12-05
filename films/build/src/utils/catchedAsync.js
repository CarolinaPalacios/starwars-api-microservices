"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchedAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res).catch((err) => next(err));
    };
};
exports.default = catchedAsync;
