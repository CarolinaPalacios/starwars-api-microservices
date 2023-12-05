import { Document, Model } from 'mongoose'
import { Gender, Director } from './enum'

export interface ICharacter extends Document {
  _id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: Gender
  homeworld: string
  films: IFilm['_id'][]
  isDeleted: boolean
}

export interface IFilm extends Document {
  _id: string
  title: string
  episode_id: number
  opening_crawl: string
  director: Director
  producer: string
  release_date: Date
  characters: ICharacter['_id'][]
  planets: IPlanet['_id'][]
  isDeleted: boolean
}

export interface IPlanet extends Document {
  _id: string
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  residents: ICharacter['_id'][]
  films: IFilm['_id'][]
  isDeleted: boolean
}

export interface ICharacterModel extends Model<ICharacter & Document> {
  list(skip?: number, limit?: number): Promise<CharacterListResult>
  get(id: string): Promise<(ICharacter & Document) | null>
  insert(character: ICharacter): Promise<(ICharacter & Document) | null>
  update: (
    id: string,
    character: ICharacter
  ) => Promise<(ICharacter & Document) | null>
  delete(id: string): Promise<ICharacter & Document>
  softDelete(id: string): Promise<(ICharacter & Document) | null>
  filterBy(
    type: 'gender' | 'name',
    value: string,
    skip?: number,
    limit?: number
  ): Promise<CharacterListResult>
}

export interface IFilmModel extends Model<IFilm & Document> {
  list(skip?: number, limit?: number): Promise<FilmListResult>
  get(id: string): Promise<IFilm & Document>
  insert(film: IFilm): Promise<(IFilm & Document) | null>
  update: (id: string, film: IFilm) => Promise<(IFilm & Document) | null>
  delete(id: string): Promise<(IFilm & Document) | null>
  softDelete(id: string): Promise<(IFilm & Document) | null>
}

export interface IPlanetModel extends Model<IPlanet & Document> {
  list(skip?: number, limit?: number): Promise<PlanetListResult>
  get(id: string): Promise<IPlanet & Document>
  insert(planet: IPlanet): Promise<(IPlanet & Document) | null>
  update: (id: string, planet: IPlanet) => Promise<(IPlanet & Document) | null>
  delete(id: string): Promise<(IPlanet & Document) | null>
  softDelete(id: string): Promise<(IPlanet & Document) | null>
}

export interface CharacterListResult {
  characters: (ICharacter & Document)[]
  totalPages: number
  currentPage: number
  total: number
  nextPage: number
  prevPage: number
}

export interface FilmListResult {
  films: (IFilm & Document)[]
  totalPages: number
  currentPage: number
  total: number
  nextPage: number
  prevPage: number
}

export interface PlanetListResult {
  planets: (IPlanet & Document)[]
  totalPages: number
  currentPage: number
  total: number
  nextPage: number
  prevPage: number
}

export type StoreModel = {
  Character: ICharacterModel
  Film: IFilmModel
  Planet: IPlanetModel
}
