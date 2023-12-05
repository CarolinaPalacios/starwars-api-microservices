import request from 'supertest'
import server from '../src/server'
import { PlanetType } from '../src/types/types'

describe('GET @/planets', () => {
  it('returns 200 OK', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
  })
  it('returns an array of planets', async () => {
    const response = await request(server).get('/')
    expect(response.body.data).toBeInstanceOf(Array)
    response.body.data.forEach((planet: PlanetType) => {
      expect(planet).toHaveProperty('id')
      expect(planet).toHaveProperty('name')
      expect(planet).toHaveProperty('rotation_period')
      expect(planet).toHaveProperty('orbital_period')
      expect(planet).toHaveProperty('diameter')
      expect(planet).toHaveProperty('climate')
      expect(planet).toHaveProperty('gravity')
      expect(planet).toHaveProperty('terrain')
      expect(planet).toHaveProperty('surface_water')
      expect(planet).toHaveProperty('residents')
      expect(planet).toHaveProperty('films')
      expect(planet.residents).toBeInstanceOf(Array)
      expect(planet.films).toBeInstanceOf(Array)
    })
  })
})

describe('POST @/planets', () => {
  it('returns 201 Created', async () => {
    const response = await request(server).post('/')
    expect(response.status).toBe(201)
  })
  it('returns "creating planet"', async () => {
    const response = await request(server).post('/')
    expect(response.body.data).toBe('creating planet')
  })
})
