import { NextFunction, Request, Response } from 'express'
import { StoreModel } from '../../types/types'

const validateModel = (req: Request, _res: Response, next: NextFunction) => {
  const { model } = req.params as { model: keyof StoreModel }
  if (['Character', 'Film', 'Planet'].includes(model)) {
    return next()
  } else {
    throw Error('Invalid model')
  }
}

export default validateModel
