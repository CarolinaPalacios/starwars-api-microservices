import { Response } from 'express'
import {
  CharacterListResult,
  FilmListResult,
  PlanetListResult,
} from '../../types/types'
import getModelData from './getModelData'

const getListResponse = (
  res: Response,
  statusCode: number,
  response: CharacterListResult | FilmListResult | PlanetListResult,
  model: string,
  page: number
) => {
  const totalPages = response.totalPages || 1
  const currentPage = page > totalPages ? totalPages : page
  res.status(statusCode).json({
    total: response.total,
    currentPage,
    ...(page > 1 && { prevPage: currentPage - 1 }),
    ...(page < totalPages && { nextPage: currentPage + 1 }),
    totalPages,
    [model]: getModelData(response, model),
  })
}

export default getListResponse
