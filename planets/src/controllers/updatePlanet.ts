import { Request, Response } from 'express'
import { response } from '../utils'
import axios from 'axios'

const updatePlanet = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = await axios.put(
    `http://database:8004/Planet/${id}`,
    req.body
  )
  response(res, 200, data)
}

export default updatePlanet
