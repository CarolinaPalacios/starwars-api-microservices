import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const createPlanet = async (req: Request, res: Response) => {
  const { data } = await axios.post('http://database:8004/Planet', req.body)
  response(res, 201, data)
}

export default createPlanet
