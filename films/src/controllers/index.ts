import createFilm from './createFilm'
import deleteFilm from './deleteFilm'
import getFilmById from './getFilmById'
import getFilms from './getFilms'
import softFilmDelete from './softFilmDelete'
import updateFilm from './updateFilm'
import { catchedAsync } from '../utils'

export default {
  createFilm: catchedAsync(createFilm),
  deleteFilm: catchedAsync(deleteFilm),
  getFilmById: catchedAsync(getFilmById),
  getFilms: catchedAsync(getFilms),
  softFilmDelete: catchedAsync(softFilmDelete),
  updateFilm: catchedAsync(updateFilm),
}
