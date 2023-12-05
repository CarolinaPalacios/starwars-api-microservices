import request from 'supertest'
import server from '../src/server'

describe('@/', () => {
  describe('Invalid model', () => {
    it('responds with 500 and error message when model is not valid', async () => {
      const response = await request(server).get('/test')
      expect(response.status).toBe(500)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Invalid model')
    })
  })
  describe('Route not found', () => {
    it('responds with 404 and error message when route is not found', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(404)
      expect(response.body.error).toBeTruthy()
      expect(response.body.message).toBe('Route not found')
    })
  })
})
