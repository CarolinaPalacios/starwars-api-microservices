import { Request, Response, NextFunction } from 'express'
import { errors } from '../utils'

const filmValidation = (req: Request, _res: Response, next: NextFunction) => {
  const {
    title,
    opening_crawl,
    director,
    producer,
    release_date,
    characters,
    planets,
  } = req.body
  if (
    !title ||
    !opening_crawl ||
    !director ||
    !producer ||
    !release_date ||
    !characters ||
    !planets
  ) {
    throw new errors.ClientError('Missing required fields', 401)
  }
  return next()
}

export default filmValidation
