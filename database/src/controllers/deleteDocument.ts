import { Request, Response } from 'express'
import store from '../database'
import { StoreModel } from '../types/types'
import { response } from '../utils/response'
import errors from '../utils/errors'

const deleteDocument = async (req: Request, res: Response) => {
  const { model } = req.params as { model: keyof StoreModel }
  const { id } = req.params
  const result = await store[model].delete(id)
  if (result) response(res, 200, result, model)
  else throw new errors.ClientError('Document not found', 404)
}

export default deleteDocument
