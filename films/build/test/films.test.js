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
describe('GET @/films', () => {
    it('returns 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/');
        expect(response.status).toBe(200);
    }));
    it('returns an array of films', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/');
        expect(response.body.data).toBeInstanceOf(Array);
        response.body.data.forEach((film) => {
            expect(film).toHaveProperty('id');
            expect(film).toHaveProperty('title');
            expect(film).toHaveProperty('opening_crawl');
            expect(film).toHaveProperty('director');
            expect(film).toHaveProperty('producer');
            expect(film).toHaveProperty('release_date');
            expect(film).toHaveProperty('characters');
            expect(film).toHaveProperty('planets');
            expect(film.characters).toBeInstanceOf(Array);
            expect(film.planets).toBeInstanceOf(Array);
        });
    }));
});
describe('POST @/films', () => {
    it('returns 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/');
        expect(response.status).toBe(201);
    }));
    it('returns "creating film"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/');
        expect(response.body).toBe('creating film');
    }));
});
