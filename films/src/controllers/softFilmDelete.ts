import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const softFilmDelete = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = await axios.put(`http://database:8004/Film/${id}`)
  response(res, 200, data)
}

export default softFilmDelete
