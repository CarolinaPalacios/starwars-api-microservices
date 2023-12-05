import { catchedAsync } from '../utils'
import createPlanet from './createPlanet'
import deletePlanet from './deletePlanet'
import getPlanetById from './getPlanetById'
import getPlanets from './getPlanets'
import softPlanetDelete from './softPlanetDelete'
import updatePlanet from './updatePlanet'

export default {
  createPlanet: catchedAsync(createPlanet),
  deletePlanet: catchedAsync(deletePlanet),
  getPlanetById: catchedAsync(getPlanetById),
  getPlanets: catchedAsync(getPlanets),
  softPlanetDelete: catchedAsync(softPlanetDelete),
  updatePlanet: catchedAsync(updatePlanet),
}
