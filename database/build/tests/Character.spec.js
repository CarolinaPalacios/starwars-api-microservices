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
describe('Character model', () => {
    describe('GET /@Character', () => {
        it('returns all characters', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character');
            expect(response.body.Character.length).toBeGreaterThan(0);
        }));
        it('returns a character with the correct data', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character');
            const characters = response.body.Character;
            characters.forEach((character) => {
                expect(character).toHaveProperty('name');
                expect(character).toHaveProperty('height');
                expect(character).toHaveProperty('mass');
                expect(character).toHaveProperty('hair_color');
                expect(character).toHaveProperty('skin_color');
                expect(character).toHaveProperty('eye_color');
                expect(character).toHaveProperty('birth_year');
                expect(character).toHaveProperty('gender');
                expect(character).toHaveProperty('homeworld');
                expect(character).toHaveProperty('films');
                expect(Object.values(enum_1.Gender).includes(character.gender)).toBe(true);
                expect(character.films).toBeInstanceOf(Array);
                character.films.forEach((film) => {
                    expect(film).toHaveProperty('title');
                });
                expect(character.homeworld).toBeInstanceOf(Object);
                expect(character.homeworld).toHaveProperty('name');
            });
        }));
        it('returns filtered characters if gender query params are provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character?gender=male');
            const characters = response.body.Character;
            characters.forEach((character) => {
                expect(character.gender).toBe(enum_1.Gender.Male);
            });
        }));
        it('returns filtered characters if name query params are provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character?name=luke');
            const characters = response.body.Character;
            characters.forEach((character) => {
                expect(character.name).toBe('Luke Skywalker');
            });
        }));
        it('returns error message `Document not found` when an invalid value is provided in query', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character?gender=invalid');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('GET /@Character/:id', () => {
        it('returns the correct character when a valid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character/1');
            const character = response.body.Character;
            expect(character === null || character === void 0 ? void 0 : character.name).toBe('Luke Skywalker');
            expect(character === null || character === void 0 ? void 0 : character.height).toBe('172');
            expect(character === null || character === void 0 ? void 0 : character.mass).toBe('77');
            expect(character === null || character === void 0 ? void 0 : character.skin_color).toBe('fair');
            expect(character === null || character === void 0 ? void 0 : character.eye_color).toBe('blue');
            expect(character === null || character === void 0 ? void 0 : character.hair_color).toBe('blond');
            expect(character === null || character === void 0 ? void 0 : character.birth_year).toBe('19BBY');
            if (typeof (character === null || character === void 0 ? void 0 : character.homeworld) === 'object' &&
                (character === null || character === void 0 ? void 0 : character.homeworld) !== null) {
                const homeworld = character === null || character === void 0 ? void 0 : character.homeworld;
                expect(homeworld.name).toBe('Tatooine');
            }
            if (Array.isArray(character === null || character === void 0 ? void 0 : character.films) &&
                (character === null || character === void 0 ? void 0 : character.films.length) &&
                typeof (character === null || character === void 0 ? void 0 : character.films[0]) === 'object' &&
                (character === null || character === void 0 ? void 0 : character.films[0]) !== null) {
                const film = character === null || character === void 0 ? void 0 : character.films[0];
                expect(film.title).toBe('A New Hope');
            }
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Character/100');
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('POST @/Character', () => {
        it('creates a new character', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Character')
                .send({
                _id: 'test',
                name: 'test',
                height: 'test',
                mass: 'test',
                hair_color: 'test',
                skin_color: 'test',
                eye_color: 'test',
                birth_year: 'test',
                gender: enum_1.Gender.Female,
                homeworld: 'test',
                films: ['test'],
            });
            expect(response.status).toBe(201);
            expect(response.body.Character).toHaveProperty('name', 'test');
        }));
        it('returns error message `document must have an _id before saving` when no _id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Character')
                .send({
                name: 'test',
                height: 'test',
                mass: 'test',
                hair_color: 'test',
                skin_color: 'test',
                eye_color: 'test',
                birth_year: 'test',
                gender: enum_1.Gender.Female,
                homeworld: 'test',
                films: ['test'],
            });
            expect(response.status).toBe(500);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('document must have an _id before saving');
        }));
        it('returns error message `Missing required fields` when required fields are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Character')
                .send({
                _id: 'test',
                height: 'test',
                mass: 'test',
                hair_color: 'test',
                skin_color: 'test',
                films: ['test'],
            });
            expect(response.status).toBe(401);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Missing required fields');
        }));
    });
    describe('PUT @/Character/:id', () => {
        it('updates a character', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Character/210').send({
                name: 'test',
            });
            expect(response.status).toBe(200);
            expect(response.body.Character).toHaveProperty('name', 'test');
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Character/100').send({
                homeworld: 'test',
            });
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('DELETE @/Character/:id', () => {
        it('deletes a character', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).delete('/Character/test');
            expect(response.status).toBe(200);
            expect(response.body.Character).toHaveProperty('name', 'test');
            const character = yield database_1.default.Character.get('test');
            expect(character).toBe(null);
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).delete('/Character/100');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('PUT @/Character/:id/soft', () => {
        it('soft deletes a character', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Character/205/soft');
            expect(response.status).toBe(200);
            expect(response.body.Character).toHaveProperty('isDeleted', true);
            const character = yield database_1.default.Character.get('test');
            expect(character).toBe(null);
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Character/100/soft');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
});
