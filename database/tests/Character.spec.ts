import request from 'supertest'
import server from '../src/server'
import store from '../src/database'
import { Gender } from '../src/types/enum'
import { ICharacter } from '../src/types/types'

describe('Character model', () => {
  describe('GET /@Character', () => {
    it('returns all characters', async () => {
      const response = await request(server).get('/Character')
      expect(response.body.Character.length).toBeGreaterThan(0)
    })
    it('returns a character with the correct data', async () => {
      const response = await request(server).get('/Character')
      const characters = response.body.Character
      characters.forEach((character: ICharacter) => {
        expect(character).toHaveProperty('name')
        expect(character).toHaveProperty('height')
        expect(character).toHaveProperty('mass')
        expect(character).toHaveProperty('hair_color')
        expect(character).toHaveProperty('skin_color')
        expect(character).toHaveProperty('eye_color')
        expect(character).toHaveProperty('birth_year')
        expect(character).toHaveProperty('gender')
        expect(character).toHaveProperty('homeworld')
        expect(character).toHaveProperty('films')
        expect(
          (Object.values(Gender) as string[]).includes(character.gender)
        ).toBe(true)
        expect(character.films).toBeInstanceOf(Array)
        character.films.forEach((film) => {
          expect(film).toHaveProperty('title')
        })
        expect(character.homeworld).toBeInstanceOf(Object)
        expect(character.homeworld).toHaveProperty('name')
      })
    })
    it('returns filtered characters if gender query params are provided', async () => {
      const response = await request(server).get('/Character?gender=male')
      const characters = response.body.Character
      characters.forEach((character: ICharacter) => {
        expect(character.gender).toBe(Gender.Male)
      })
    })
    it('returns filtered characters if name query params are provided', async () => {
      const response = await request(server).get('/Character?name=luke')
      const characters = response.body.Character
      characters.forEach((character: ICharacter) => {
        expect(character.name).toBe('Luke Skywalker')
      })
    })
    it('returns error message `Document not found` when an invalid value is provided in query', async () => {
      const response = await request(server).get('/Character?gender=invalid')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('GET /@Character/:id', () => {
    it('returns the correct character when a valid id is provided', async () => {
      const response = await request(server).get('/Character/1')
      const character = response.body.Character
      expect(character?.name).toBe('Luke Skywalker')
      expect(character?.height).toBe('172')
      expect(character?.mass).toBe('77')
      expect(character?.skin_color).toBe('fair')
      expect(character?.eye_color).toBe('blue')
      expect(character?.hair_color).toBe('blond')
      expect(character?.birth_year).toBe('19BBY')
      if (
        typeof character?.homeworld === 'object' &&
        character?.homeworld !== null
      ) {
        const homeworld = character?.homeworld as { name: string }
        expect(homeworld.name).toBe('Tatooine')
      }
      if (
        Array.isArray(character?.films) &&
        character?.films.length &&
        typeof character?.films[0] === 'object' &&
        character?.films[0] !== null
      ) {
        const film = character?.films[0] as { title: string }
        expect(film.title).toBe('A New Hope')
      }
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).get('/Character/100')
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('POST @/Character', () => {
    it('creates a new character', async () => {
      const response = await request(server)
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
          gender: Gender.Female,
          homeworld: 'test',
          films: ['test'],
        })
      expect(response.status).toBe(201)
      expect(response.body.Character).toHaveProperty('name', 'test')
    })
    it('returns error message `document must have an _id before saving` when no _id is provided', async () => {
      const response = await request(server)
        .post('/Character')
        .send({
          name: 'test',
          height: 'test',
          mass: 'test',
          hair_color: 'test',
          skin_color: 'test',
          eye_color: 'test',
          birth_year: 'test',
          gender: Gender.Female,
          homeworld: 'test',
          films: ['test'],
        })
      expect(response.status).toBe(500)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe(
        'document must have an _id before saving'
      )
    })
    it('returns error message `Missing required fields` when required fields are not provided', async () => {
      const response = await request(server)
        .post('/Character')
        .send({
          _id: 'test',
          height: 'test',
          mass: 'test',
          hair_color: 'test',
          skin_color: 'test',
          films: ['test'],
        })
      expect(response.status).toBe(401)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Missing required fields')
    })
  })
  describe('PUT @/Character/:id', () => {
    it('updates a character', async () => {
      const response = await request(server).put('/Character/210').send({
        name: 'test',
      })
      expect(response.status).toBe(200)
      expect(response.body.Character).toHaveProperty('name', 'test')
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).put('/Character/100').send({
        homeworld: 'test',
      })
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('DELETE @/Character/:id', () => {
    it('deletes a character', async () => {
      const response = await request(server).delete('/Character/test')
      expect(response.status).toBe(200)
      expect(response.body.Character).toHaveProperty('name', 'test')
      const character = await store.Character.get('test')
      expect(character).toBe(null)
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).delete('/Character/100')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('PUT @/Character/:id/soft', () => {
    it('soft deletes a character', async () => {
      const response = await request(server).put('/Character/205/soft')
      expect(response.status).toBe(200)
      expect(response.body.Character).toHaveProperty('isDeleted', true)
      const character = await store.Character.get('test')
      expect(character).toBe(null)
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).put('/Character/100/soft')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
})
