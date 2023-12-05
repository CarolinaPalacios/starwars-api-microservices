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
const database_1 = __importDefault(require("../src/database"));
const enum_1 = require("../src/types/enum");
describe('Film model', () => {
    describe('GET /@Film', () => {
        it('returns all films', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Film');
            expect(response.body.Film.length).toBeGreaterThan(0);
        }));
        it('returns a Film with the correct data', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Film');
            const films = response.body.Film;
            films.forEach((film) => {
                expect(film).toHaveProperty('title');
                expect(film).toHaveProperty('opening_crawl');
                expect(film).toHaveProperty('director');
                expect(film).toHaveProperty('producer');
                expect(film).toHaveProperty('release_date');
                expect(film).toHaveProperty('characters');
                expect(film.characters).toBeInstanceOf(Array);
                film.characters.forEach((character) => {
                    expect(character).toHaveProperty('name');
                });
                expect(film).toHaveProperty('planets');
                expect(film.planets).toBeInstanceOf(Array);
                film.planets.forEach((planet) => {
                    expect(planet).toHaveProperty('name');
                });
            });
        }));
    });
    describe('GET /@Film/:id', () => {
        it('returns the correct Film when a valid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Film/1');
            const film = response.body.Film;
            expect(film === null || film === void 0 ? void 0 : film.title).toBe('A New Hope');
            expect((film === null || film === void 0 ? void 0 : film.opening_crawl).includes('It is a period of civil war.')).toBeTruthy();
            expect(film === null || film === void 0 ? void 0 : film.director).toBe('George Lucas');
            expect(film === null || film === void 0 ? void 0 : film.producer).toBe('Gary Kurtz, Rick McCallum');
            expect(film === null || film === void 0 ? void 0 : film.release_date).toBe('1977-05-25T00:00:00.000Z');
            expect(film === null || film === void 0 ? void 0 : film.characters).toBeInstanceOf(Array);
            film === null || film === void 0 ? void 0 : film.characters.forEach((character) => {
                expect(character).toHaveProperty('name');
            });
            expect(film === null || film === void 0 ? void 0 : film.characters[0]).toHaveProperty('name', 'Luke Skywalker');
            expect(film === null || film === void 0 ? void 0 : film.planets).toBeInstanceOf(Array);
            film === null || film === void 0 ? void 0 : film.planets.forEach((planet) => {
                expect(planet).toHaveProperty('name');
            });
            expect(film === null || film === void 0 ? void 0 : film.planets[0]).toHaveProperty('name', 'Tatooine');
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Film/100');
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('POST @/Film', () => {
        it('creates a new Film', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Film')
                .send({
                _id: 'test',
                title: 'test',
                opening_crawl: 'test',
                director: enum_1.Director.GeorgeLucas,
                producer: 'test',
                release_date: '1977-05-25T00:00:00.000Z',
                characters: ['test'],
                planets: ['test'],
            });
            expect(response.status).toBe(201);
            expect(response.body.Film).toHaveProperty('title', 'test');
        }));
        it('returns error message `document must have an _id before saving` when no _id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Film')
                .send({
                title: 'test',
                opening_crawl: 'test',
                director: enum_1.Director.GeorgeLucas,
                producer: 'test',
                release_date: '1977-05-25T00:00:00.000Z',
                characters: ['test'],
                planets: ['test'],
            });
            expect(response.status).toBe(500);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('document must have an _id before saving');
        }));
        it('returns error message `Missing required fields` when required fields are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/Film').send({
                _id: 'test',
                opening_crawl: 'test',
                director: enum_1.Director.GeorgeLucas,
                producer: 'test',
            });
            expect(response.status).toBe(401);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Missing required fields');
        }));
    });
    describe('PUT @/Film/:id', () => {
        it('updates a Film', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Film/test').send({
                title: 'test-updated',
            });
            expect(response.status).toBe(200);
            expect(response.body.Film).toHaveProperty('title', 'test-updated');
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Film/100').send({
                homeworld: 'test',
            });
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('DELETE @/Film/:id', () => {
        it('deletes a Film', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).delete('/Film/test');
            expect(response.status).toBe(200);
            expect(response.body.Film).toHaveProperty('title', 'test-updated');
            const Film = yield database_1.default.Film.get('test');
            expect(Film).toBe(null);
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).delete('/Film/100');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('PUT @/Film/:id/soft', () => {
        it('soft deletes a Film', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Film/205/soft');
            expect(response.status).toBe(200);
            expect(response.body.Film).toHaveProperty('isDeleted', true);
            const Film = yield database_1.default.Film.get('test');
            expect(Film).toBe(null);
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Film/100/soft');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
});
