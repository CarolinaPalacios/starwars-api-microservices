import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const updateCharacter = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = await axios.put(
    `http://database:8004/Character/${id}`,
    req.body
  )
  response(res, 200, data)
}

export default updateCharacter
