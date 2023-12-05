"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = (0, express_1.Router)();
router.get('/:model', validate_1.default.validateModel, controllers_1.default.getDocumentList);
router.get('/:model/:id', validate_1.default.validateModel, controllers_1.default.getDocumentById);
router.post('/:model', validate_1.default.validateModel, validate_1.default.validateFields, controllers_1.default.insertDocument);
router.put('/:model/:id', validate_1.default.validateModel, controllers_1.default.updateDocument);
router.put('/:model/:id/soft', validate_1.default.validateModel, controllers_1.default.softDocumentDelete);
router.delete('/:model/:id', validate_1.default.validateModel, controllers_1.default.deleteDocument);
exports.default = router;
