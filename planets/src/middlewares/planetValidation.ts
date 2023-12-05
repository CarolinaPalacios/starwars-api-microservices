import { Request, Response, NextFunction } from 'express'
import { errors } from '../utils'

const planetValidation = (req: Request, _res: Response, next: NextFunction) => {
  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    residents,
    films,
  } = req.body
  if (
    !name ||
    !rotation_period ||
    !orbital_period ||
    !diameter ||
    !climate ||
    !gravity ||
    !terrain ||
    !surface_water ||
    !residents ||
    !films
  ) {
    throw new errors.ClientError('Missing required fields', 401)
  }
  return next()
}

export default planetValidation
