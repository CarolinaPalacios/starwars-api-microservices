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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
describe('@/', () => {
    describe('Invalid model', () => {
        it('responds with 500 and error message when model is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/test');
            expect(response.status).toBe(500);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Invalid model');
        }));
    });
    describe('Route not found', () => {
        it('responds with 404 and error message when route is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Route not found');
        }));
    });
});
