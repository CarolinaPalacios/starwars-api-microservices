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
describe('GET @/characters', () => {
    it('returns 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/');
        expect(response.status).toBe(200);
    }));
    it('returns an array of characters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/');
        expect(response.body.data).toBeInstanceOf(Array);
        response.body.data.forEach((character) => {
            expect(character).toHaveProperty('id');
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
            expect(character.films).toBeInstanceOf(Array);
        });
    }));
});
describe('POST @/characters', () => {
    const validCharacter = {
        name: 'test character',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: '1',
        films: ['2', '3'],
    };
    const postCharacter = (user = validCharacter) => {
        const agent = (0, supertest_1.default)(server_1.default).post('/');
        return agent.send(user);
    };
    it('returns 201 Created', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield postCharacter();
        expect(response.status).toBe(201);
    }));
    it('returns creating character', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield postCharacter();
        const createdCharacter = response.body.data;
        expect(createdCharacter).toEqual(expect.objectContaining(validCharacter));
    }));
    it('returns error message if missing data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield postCharacter({ name: '' });
        expect(response.body).toEqual({
            error: true,
            message: 'Missing required fields',
        });
    }));
});
