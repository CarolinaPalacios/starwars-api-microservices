import express from 'express'
import morgan from 'morgan'
import router from './routes'
import errorHandler from './handlers/errorHandler'
import errors from './utils/errors'

const server = express()

server.use(express.json())
server.use(morgan('dev'))

server.use(router)

server.use('*', () => {
  throw new errors.ClientError('Route not found', 404)
})

server.use(errorHandler)

export default server
