import mongoose, { Document } from 'mongoose'
import { MONGO_URI } from '../config/env'
import schema from './schemas'
import {
  ICharacter,
  ICharacterModel,
  IFilm,
  IFilmModel,
  IPlanet,
  IPlanetModel,
  StoreModel,
} from '../types/types'

const conn = mongoose.createConnection(MONGO_URI)

const CharacterModel = conn.model<ICharacter & Document, ICharacterModel>(
  'Character',
  schema.character
)
const FilmModel = conn.model<IFilm & Document, IFilmModel>('Film', schema.film)
const PlanetModel = conn.model<IPlanet & Document, IPlanetModel>(
  'Planet',
  schema.planet
)

const store: StoreModel = {
  Character: CharacterModel,
  Film: FilmModel,
  Planet: PlanetModel,
}

export default store
