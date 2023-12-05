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
describe('Planet model', () => {
    describe('GET /@Planet', () => {
        it('returns all planets', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Planet');
            expect(response.body.Planet.length).toBeGreaterThan(0);
        }));
        it('returns a Planet with the correct data', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Planet');
            const planets = response.body.Planet;
            planets.forEach((planet) => {
                expect(planet).toHaveProperty('name');
                expect(planet).toHaveProperty('rotation_period');
                expect(planet).toHaveProperty('orbital_period');
                expect(planet).toHaveProperty('diameter');
                expect(planet).toHaveProperty('climate');
                expect(planet).toHaveProperty('gravity');
                expect(planet).toHaveProperty('terrain');
                expect(planet).toHaveProperty('surface_water');
                expect(planet).toHaveProperty('residents');
                expect(planet.residents).toBeInstanceOf(Array);
                planet.residents.forEach((character) => {
                    expect(character).toHaveProperty('name');
                });
                expect(planet).toHaveProperty('films');
                expect(planet.films).toBeInstanceOf(Array);
                planet.films.forEach((film) => {
                    expect(film).toHaveProperty('title');
                });
            });
        }));
    });
    describe('GET /@Planet/:id', () => {
        it('returns the correct Planet when a valid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Planet/1');
            const planet = response.body.Planet;
            expect(planet === null || planet === void 0 ? void 0 : planet.name).toBe('Tatooine');
            expect(planet === null || planet === void 0 ? void 0 : planet.rotation_period).toBe('23');
            expect(planet === null || planet === void 0 ? void 0 : planet.orbital_period).toBe('304');
            expect(planet === null || planet === void 0 ? void 0 : planet.diameter).toBe('10465');
            expect(planet === null || planet === void 0 ? void 0 : planet.climate).toBe('arid');
            expect(planet === null || planet === void 0 ? void 0 : planet.gravity).toBe('1 standard');
            expect(planet === null || planet === void 0 ? void 0 : planet.terrain).toBe('desert');
            expect(planet === null || planet === void 0 ? void 0 : planet.surface_water).toBe('1');
            expect(planet === null || planet === void 0 ? void 0 : planet.residents).toBeInstanceOf(Array);
            planet === null || planet === void 0 ? void 0 : planet.residents.forEach((character) => {
                expect(character).toHaveProperty('name');
            });
            expect(planet === null || planet === void 0 ? void 0 : planet.residents[0]).toHaveProperty('name', 'Luke Skywalker');
            expect(planet === null || planet === void 0 ? void 0 : planet.films).toBeInstanceOf(Array);
            planet === null || planet === void 0 ? void 0 : planet.films.forEach((film) => {
                expect(film).toHaveProperty('title');
            });
            expect(planet === null || planet === void 0 ? void 0 : planet.films[0]).toHaveProperty('title', 'A New Hope');
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get('/Planet/100');
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('POST @/Planet', () => {
        it('creates a new Planet', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Planet')
                .send({
                _id: 'test',
                name: 'test',
                rotation_period: 'test',
                orbital_period: 'test',
                diameter: 'test',
                climate: 'test',
                gravity: 'test',
                terrain: 'test',
                surface_water: 'test',
                residents: ['test'],
                films: ['test'],
            });
            expect(response.status).toBe(201);
            expect(response.body.Planet).toHaveProperty('name', 'test');
        }));
        it('returns error message `document must have an _id before saving` when no _id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/Planet')
                .send({
                name: 'test',
                rotation_period: 'test',
                orbital_period: 'test',
                diameter: 'test',
                climate: 'test',
                gravity: 'test',
                terrain: 'test',
                surface_water: 'test',
                residents: ['test'],
                films: ['test'],
            });
            expect(response.status).toBe(500);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('document must have an _id before saving');
        }));
        it('returns error message `Missing required fields` when required fields are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post('/Planet').send({
                _id: 'test1',
                name: 'test',
                rotation_period: 'test',
            });
            expect(response.status).toBe(401);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Missing required fields');
        }));
    });
    describe('PUT @/Planet/:id', () => {
        it('updates a Planet', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Planet/test').send({
                name: 'test-updated',
            });
            expect(response.status).toBe(200);
            expect(response.body.Planet).toHaveProperty('name', 'test-updated');
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Planet/100').send({
                homeworld: 'test',
            });
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('DELETE @/Planet/:id', () => {
        it('deletes a Planet', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).delete('/Planet/test');
            expect(response.status).toBe(200);
            expect(response.body.Planet).toHaveProperty('name', 'test-updated');
            const Planet = yield database_1.default.Planet.get('test');
            expect(Planet).toBe(null);
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).delete('/Planet/100');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
    describe('PUT @/Planet/:id/soft', () => {
        it('soft deletes a Planet', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Planet/205/soft');
            expect(response.status).toBe(200);
            expect(response.body.Planet).toHaveProperty('isDeleted', true);
            const Planet = yield database_1.default.Planet.get('test');
            expect(Planet).toBe(null);
        }));
        it('returns error message `Document not found` when an invalid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).put('/Planet/100/soft');
            expect(response.status).toBe(404);
            expect(response.body.error).toBeTruthy();
            expect(response.body.message).toBe('Document not found');
        }));
    });
});
