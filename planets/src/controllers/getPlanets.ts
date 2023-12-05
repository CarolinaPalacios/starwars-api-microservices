import { Request, Response } from 'express'
import { response } from '../utils'
import axios from 'axios'

const getPlanets = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const { data } = await axios.get(
    `http://database:8004/Planet?page=${page}&limit=${limit}`
  )
  response(res, 200, data)
}

export default getPlanets
