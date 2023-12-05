import axios from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils'

const getCharacters = async (req: Request, res: Response) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const { gender, name } = req.query

  if (gender) {
    const { data } = await axios.get(
      `http://database:8004/Character?page=${page}&limit=${limit}&gender=${gender}`
    )
    return response(res, 200, data)
  } else if (name) {
    const { data } = await axios.get(
      `http://database:8004/Character?page=${page}&limit=${limit}&name=${name}`
    )
    return response(res, 200, data)
  } else {
    const { data } = await axios.get(
      `http://database:8004/Character?page=${page}&limit=${limit}`
    )
    return response(res, 200, data)
  }
}

export default getCharacters
