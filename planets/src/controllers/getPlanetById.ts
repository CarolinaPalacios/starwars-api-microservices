import { Request, Response } from 'express'
import { response } from '../utils'
import axios from 'axios'

const getPlanetById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = await axios.get(`http://database:8004/Planet/${id}`)
  response(res, 200, data)
}

export default getPlanetById
