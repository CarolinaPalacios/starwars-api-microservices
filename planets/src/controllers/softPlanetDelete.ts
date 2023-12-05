import { Request, Response } from 'express'
import { response } from '../utils'
import axios from 'axios'

const softPlanetDelete = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = await axios.put(`http://database:8004/Planet/${id}/soft`)
  response(res, 200, data)
}

export default softPlanetDelete
