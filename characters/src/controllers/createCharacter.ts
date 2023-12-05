import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const createCharacter = async (req: Request, res: Response) => {
  const { data } = await axios.post('http://database:8004/Character', req.body)
  response(res, 201, data)
}

export default createCharacter
