import request from 'supertest'
import server from '../src/server'
import type { FilmType } from '../src/types/types'

describe('GET @/films', () => {
  it('returns 200 OK', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
  })
  it('returns an array of films', async () => {
    const response = await request(server).get('/')
    expect(response.body.data).toBeInstanceOf(Array)
    response.body.data.forEach((film: FilmType) => {
      expect(film).toHaveProperty('id')
      expect(film).toHaveProperty('title')
      expect(film).toHaveProperty('opening_crawl')
      expect(film).toHaveProperty('director')
      expect(film).toHaveProperty('producer')
      expect(film).toHaveProperty('release_date')
      expect(film).toHaveProperty('characters')
      expect(film).toHaveProperty('planets')
      expect(film.characters).toBeInstanceOf(Array)
      expect(film.planets).toBeInstanceOf(Array)
    })
  })
})

describe('POST @/films', () => {
  it('returns 201 Created', async () => {
    const response = await request(server).post('/')
    expect(response.status).toBe(201)
  })
  it('returns "creating film"', async () => {
    const response = await request(server).post('/')
    expect(response.body).toBe('creating film')
  })
})
