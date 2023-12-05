import { Request, Response, NextFunction } from 'express'
import { errors } from '../utils'

const characterValidation = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
  } = req.body
  if (
    !name ||
    !height ||
    !mass ||
    !hair_color ||
    !skin_color ||
    !eye_color ||
    !birth_year ||
    !gender ||
    !homeworld ||
    !films
  ) {
    throw new errors.ClientError('Missing required fields', 401)
  }
  return next()
}

export default characterValidation
