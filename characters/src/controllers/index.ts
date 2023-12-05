import { catchedAsync } from '../utils'
import createCharacter from './createCharacter'
import deleteCharacter from './deleteCharacter'
import getCharacterById from './getCharacterById'
import getCharacters from './getCharacters'
import softCharacterDelete from './softCharacterDelete'
import updateCharacter from './updateCharacter'

export default {
  createCharacter: catchedAsync(createCharacter),
  deleteCharacter: catchedAsync(deleteCharacter),
  getCharacterById: catchedAsync(getCharacterById),
  getCharacters: catchedAsync(getCharacters),
  softCharacterDelete: catchedAsync(softCharacterDelete),
  updateCharacter: catchedAsync(updateCharacter),
}
