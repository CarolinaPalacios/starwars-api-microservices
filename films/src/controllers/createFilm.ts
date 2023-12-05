import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const createFilm = async (req: Request, res: Response) => {
  const { data } = await axios.post('http://database:8004/Film', req.body)
  response(res, 201, data)
}

export default createFilm
