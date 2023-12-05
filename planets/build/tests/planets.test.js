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
describe('GET @/planets', () => {
    it('returns 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/');
        expect(response.status).toBe(200);
    }));
    it('returns an array of planets', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/');
        expect(response.body.data).toBeInstanceOf(Array);
        response.body.data.forEach((planet) => {
            expect(planet).toHaveProperty('id');
            expect(planet).toHaveProperty('name');
            expect(planet).toHaveProperty('rotation_period');
            expect(planet).toHaveProperty('orbital_period');
            expect(planet).toHaveProperty('diameter');
            expect(planet).toHaveProperty('climate');
            expect(planet).toHaveProperty('gravity');
            expect(planet).toHaveProperty('terrain');
            expect(planet).toHaveProperty('surface_water');
            expect(planet).toHaveProperty('residents');
            expect(planet).toHaveProperty('films');
            expect(planet.residents).toBeInstanceOf(Array);
            expect(planet.films).toBeInstanceOf(Array);
        });
    }));
});
describe('POST @/planets', () => {
    it('returns 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/');
        expect(response.status).toBe(201);
    }));
    it('returns "creating planet"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/');
        expect(response.body.data).toBe('creating planet');
    }));
});
