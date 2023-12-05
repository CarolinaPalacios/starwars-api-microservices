import { Response } from 'express'
import { ICharacter, IFilm, IPlanet } from '../../types/types'

const response = (
  res: Response,
  statusCode: number,
  document: ICharacter | IFilm | IPlanet,
  model: string
) => {
  res.status(statusCode).json({ [model]: document })
}

export default response
