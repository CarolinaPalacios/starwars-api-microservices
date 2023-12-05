import { Request, Response, NextFunction } from 'express'
import errors from '../../utils/errors'
import { StoreModel } from '../../types/types'

const validateFields = (req: Request, _res: Response, next: NextFunction) => {
  const { model } = req.params as { model: keyof StoreModel }
  const fieldsToCheck = getFieldsToCheck(model)

  if (!checkRequiredFields(req.body, fieldsToCheck)) {
    throw new errors.ClientError('Missing required fields', 401)
  }

  return next()
}

const getFieldsToCheck = (model: keyof StoreModel): string[] => {
  const fieldsMap: Record<keyof StoreModel, string[]> = {
    Character: [
      'name',
      'height',
      'mass',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year',
      'gender',
      'homeworld',
      'films',
    ],
    Film: [
      'title',
      'opening_crawl',
      'director',
      'producer',
      'release_date',
      'characters',
      'planets',
    ],
    Planet: [
      'name',
      'rotation_period',
      'orbital_period',
      'diameter',
      'climate',
      'gravity',
      'terrain',
      'surface_water',
      'residents',
      'films',
    ],
  }

  return fieldsMap[model] || []
}

const checkRequiredFields = (
  body: Record<string, any>,
  requiredFields: string[]
): boolean => {
  return requiredFields.every(
    (field) => body[field] !== undefined && body[field] !== null
  )
}

export default validateFields
