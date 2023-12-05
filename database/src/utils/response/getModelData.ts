import {
  CharacterListResult,
  FilmListResult,
  PlanetListResult,
} from '../../types/types'

function getModelData(
  response: CharacterListResult | FilmListResult | PlanetListResult,
  model: string
) {
  switch (model) {
    case 'Character':
      return (response as CharacterListResult).characters
    case 'Film':
      return (response as FilmListResult).films
    case 'Planet':
      return (response as PlanetListResult).planets
    default:
      throw new Error('Model not found')
  }
}
export default getModelData
