import request from 'supertest'
import server from '../src/server'
import store from '../src/database'
import { IFilm } from '../src/types/types'
import { Director } from '../src/types/enum'

describe('Film model', () => {
  describe('GET /@Film', () => {
    it('returns all films', async () => {
      const response = await request(server).get('/Film')
      expect(response.body.Film.length).toBeGreaterThan(0)
    })
    it('returns a Film with the correct data', async () => {
      const response = await request(server).get('/Film')
      const films = response.body.Film
      films.forEach((film: IFilm) => {
        expect(film).toHaveProperty('title')
        expect(film).toHaveProperty('opening_crawl')
        expect(film).toHaveProperty('director')
        expect(film).toHaveProperty('producer')
        expect(film).toHaveProperty('release_date')
        expect(film).toHaveProperty('characters')
        expect(film.characters).toBeInstanceOf(Array)
        film.characters.forEach((character) => {
          expect(character).toHaveProperty('name')
        })
        expect(film).toHaveProperty('planets')
        expect(film.planets).toBeInstanceOf(Array)
        film.planets.forEach((planet) => {
          expect(planet).toHaveProperty('name')
        })
      })
    })
  })
  describe('GET /@Film/:id', () => {
    it('returns the correct Film when a valid id is provided', async () => {
      const response = await request(server).get('/Film/1')
      const film = response.body.Film
      expect(film?.title).toBe('A New Hope')
      expect(
        (film?.opening_crawl).includes('It is a period of civil war.')
      ).toBeTruthy()
      expect(film?.director).toBe('George Lucas')
      expect(film?.producer).toBe('Gary Kurtz, Rick McCallum')
      expect(film?.release_date).toBe('1977-05-25T00:00:00.000Z')
      expect(film?.characters).toBeInstanceOf(Array)
      film?.characters.forEach((character: any) => {
        expect(character).toHaveProperty('name')
      })
      expect(film?.characters[0]).toHaveProperty('name', 'Luke Skywalker')
      expect(film?.planets).toBeInstanceOf(Array)
      film?.planets.forEach((planet: any) => {
        expect(planet).toHaveProperty('name')
      })
      expect(film?.planets[0]).toHaveProperty('name', 'Tatooine')
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).get('/Film/100')
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('POST @/Film', () => {
    it('creates a new Film', async () => {
      const response = await request(server)
        .post('/Film')
        .send({
          _id: 'test',
          title: 'test',
          opening_crawl: 'test',
          director: Director.GeorgeLucas,
          producer: 'test',
          release_date: '1977-05-25T00:00:00.000Z',
          characters: ['test'],
          planets: ['test'],
        })

      expect(response.status).toBe(201)
      expect(response.body.Film).toHaveProperty('title', 'test')
    })
    it('returns error message `document must have an _id before saving` when no _id is provided', async () => {
      const response = await request(server)
        .post('/Film')
        .send({
          title: 'test',
          opening_crawl: 'test',
          director: Director.GeorgeLucas,
          producer: 'test',
          release_date: '1977-05-25T00:00:00.000Z',
          characters: ['test'],
          planets: ['test'],
        })
      expect(response.status).toBe(500)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe(
        'document must have an _id before saving'
      )
    })
    it('returns error message `Missing required fields` when required fields are not provided', async () => {
      const response = await request(server).post('/Film').send({
        _id: 'test',
        opening_crawl: 'test',
        director: Director.GeorgeLucas,
        producer: 'test',
      })
      expect(response.status).toBe(401)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Missing required fields')
    })
  })
  describe('PUT @/Film/:id', () => {
    it('updates a Film', async () => {
      const response = await request(server).put('/Film/test').send({
        title: 'test-updated',
      })
      expect(response.status).toBe(200)
      expect(response.body.Film).toHaveProperty('title', 'test-updated')
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).put('/Film/100').send({
        homeworld: 'test',
      })
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('DELETE @/Film/:id', () => {
    it('deletes a Film', async () => {
      const response = await request(server).delete('/Film/test')
      expect(response.status).toBe(200)
      expect(response.body.Film).toHaveProperty('title', 'test-updated')
      const Film = await store.Film.get('test')
      expect(Film).toBe(null)
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).delete('/Film/100')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
  describe('PUT @/Film/:id/soft', () => {
    it('soft deletes a Film', async () => {
      const response = await request(server).put('/Film/205/soft')
      expect(response.status).toBe(200)
      expect(response.body.Film).toHaveProperty('isDeleted', true)
      const Film = await store.Film.get('test')
      expect(Film).toBe(null)
    })
    it('returns error message `Document not found` when an invalid id is provided', async () => {
      const response = await request(server).put('/Film/100/soft')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Document not found')
    })
  })
})
