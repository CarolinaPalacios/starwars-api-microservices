import { Router } from 'express'
import controllers from '../controllers'
import validate from '../middlewares'

const router = Router()

router.get('/', controllers.getFilms)
router.get('/:id', controllers.getFilmById)
router.post('/', validate.filmValidation, controllers.createFilm)
router.put('/:id', controllers.updateFilm)
router.put('/:id/soft', controllers.softFilmDelete)
router.delete('/:id', controllers.deleteFilm)

export default router
