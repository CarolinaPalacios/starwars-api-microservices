import request from 'supertest'
import server from '../src/server'
import store from '../src/database'
import { IPlanet } from '../src/types/types'

describe('Planet model', () => {
  describe('GET /@Planet', () => {
    it('returns all planets', async () => {
      const response = await request(server).get('/Planet')
      expect(response.body.Planet.length).toBeGreaterThan(0)
    })
    it('returns a Planet with the correct data', async () => {
      const response = await request(server).get('/Planet')
      const planets = response.body.Planet
      planets.forEach((planet: IPlanet) => {
        expect(planet).toHaveProperty('name')
        expect(planet).toHaveProperty('rotation_period')
        expect(planet).toHaveProperty('orbital_period')
        expect(planet).toHaveProperty('diameter')
        expect(planet).toHaveProperty('climate')
        expect(planet).toHaveProperty('gravity')
        expect(planet).toHaveProperty('terrain')
        expect(planet).toHaveProperty('surface_water')
        expect(planet).toHaveProperty('residents')
        expect(planet.residents).toBeInstanceOf(Array)
        planet.residents.forEach((character) => {
          expect(character).toHaveProperty('name')
        })
        expect(planet).toHaveProperty('films')
        expect(planet.films).toBeInstanceOf(Array)
        planet.films.forEach((film) => {
          expect(film).toHaveProperty('title')
        })
      })
    })
  })
  describe('GET /@Planet/:id', () => {
    it('returns the correct Planet when a valid id is provided', async () => {
      const response = await request(server).get('/Planet/1')
      const planet = response.body.Planet
      expect(planet?.name).toBe('Tatooine')
      expect(planet?.rotation_period).toBe('23')
      expect(planet?.orbital_period).toBe('304')
      expect(planet?.diameter).toBe('10465')
      expect(planet?.climate).toBe('arid')
      expect(planet?.gravity).toBe('1 standard')
      expect(planet?.terrain).toBe('desert')
      expect(planet?.surface_water).toBe('1')
      expect(planet?.residents).toBeInstanceOf(Array)
      planet?.residents.forEach((character: any) => {
        expect(character).toHaveProperty('name')
      })
      expect(planet?.residents[0]).toHaveProperty('name', 'Luke Skywalker')
      expect(planet?.films).toBeInstanceOf(Array)
      planet?.films.forEach((film: any) => {
        expect(film).toHaveProperty('title')
      })
      expect(planet?.films[0]).toHaveProperty('title', 'A New Hope')
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).get('/Planet/100')
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('POST @/Planet', () => {
    it('creates a new Planet', async () => {
      const response = await request(server)
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
        })

      expect(response.status).toBe(201)
      expect(response.body.Planet).toHaveProperty('name', 'test')
    })
    it('returns error message `document must have an _id before saving` when no _id is provided', async () => {
      const response = await request(server)
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
        })
      expect(response.status).toBe(500)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe(
        'document must have an _id before saving'
      )
    })
    it('returns error message `Missing required fields` when required fields are not provided', async () => {
      const response = await request(server).post('/Planet').send({
        _id: 'test1',
        name: 'test',
        rotation_period: 'test',
      })
      expect(response.status).toBe(401)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Missing required fields')
    })
  })
  describe('PUT @/Planet/:id', () => {
    it('updates a Planet', async () => {
      const response = await request(server).put('/Planet/test').send({
        name: 'test-updated',
      })
      expect(response.status).toBe(200)
      expect(response.body.Planet).toHaveProperty('name', 'test-updated')
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).put('/Planet/100').send({
        homeworld: 'test',
      })
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('DELETE @/Planet/:id', () => {
    it('deletes a Planet', async () => {
      const response = await request(server).delete('/Planet/test')
      expect(response.status).toBe(200)
      expect(response.body.Planet).toHaveProperty('name', 'test-updated')
      const Planet = await store.Planet.get('test')
      expect(Planet).toBe(null)
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).delete('/Planet/100')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('PUT @/Planet/:id/soft', () => {
    it('soft deletes a Planet', async () => {
      const response = await request(server).put('/Planet/205/soft')
      expect(response.status).toBe(200)
      expect(response.body.Planet).toHaveProperty('isDeleted', true)
      const Planet = await store.Planet.get('test')
      expect(Planet).toBe(null)
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).put('/Planet/100/soft')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
})
