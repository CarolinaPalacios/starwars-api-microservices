import request from 'supertest'
import server from '../src/server'
import type { CharacterType } from '../src/types/types'

describe('GET @/characters', () => {
  it('returns 200 OK', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
  })
  it('returns an array of characters', async () => {
    const response = await request(server).get('/')
    expect(response.body.data).toBeInstanceOf(Array)
    response.body.data.forEach((character: CharacterType) => {
      expect(character).toHaveProperty('id')
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
      expect(character.films).toBeInstanceOf(Array)
    })
  })
})

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
  }
  const postCharacter = (user: Partial<CharacterType> = validCharacter) => {
    const agent = request(server).post('/')
    return agent.send(user)
  }

  it('returns 201 Created', async () => {
    const response = await postCharacter()
    expect(response.status).toBe(201)
  })
  it('returns creating character', async () => {
    const response = await postCharacter()
    const createdCharacter = response.body.data
    expect(createdCharacter).toEqual(expect.objectContaining(validCharacter))
  })
  it('returns error message if missing data', async () => {
    const response = await postCharacter({ name: '' })
    expect(response.body).toEqual({
      error: true,
      message: 'Missing required fields',
    })
  })
})
