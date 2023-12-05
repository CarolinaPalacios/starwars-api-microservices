import express from 'express'
import morgan from 'morgan'
import router from './routes'
import errorHandler from './handlers/errorHandler'
import { errors } from './utils'

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use('/planets', router)

server.use('*', () => {
  throw new errors.ClientError('Not found', 404)
})

server.use(errorHandler)

export default server
