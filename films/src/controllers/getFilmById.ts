import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const getFilmById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = await axios.get(`http://database:8004/Film/${id}`)
  response(res, 200, data)
}

export default getFilmById
