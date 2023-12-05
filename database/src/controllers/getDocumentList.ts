import { Request, Response } from 'express'
import store from '../database'
import {
  CharacterListResult,
  FilmListResult,
  PlanetListResult,
  StoreModel,
} from '../types/types'
import { getListResponse } from '../utils/response'
import errors from '../utils/errors'

const getDocumentList = async (req: Request, res: Response) => {
  const { model } = req.params as { model: keyof StoreModel }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const { gender, name }: { gender?: string; name?: string } = req.query

  let response: CharacterListResult | FilmListResult | PlanetListResult

  if (model === 'Character' && gender) {
    response = await store.Character.filterBy('gender', gender)
  } else if (model === 'Character' && name) {
    response = await store.Character.filterBy('name', name)
  } else {
    response = await store[model].list((page - 1) * limit, limit)
  }
  if (response.total === 0)
    throw new errors.ClientError('Document not found', 404)
  getListResponse(res, 200, response, model, page)
}

export default getDocumentList
