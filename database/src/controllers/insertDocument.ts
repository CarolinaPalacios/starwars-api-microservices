import { Request, Response } from 'express'
import store from '../database'
import { StoreModel } from '../types/types'
import { response } from '../utils/response'

const insertDocument = async (req: Request, res: Response) => {
  const { model } = req.params as { model: keyof StoreModel }
  const result = await store[model].insert(req.body)
  if (result) response(res, 201, result, model)
}

export default insertDocument
