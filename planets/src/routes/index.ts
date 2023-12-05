import { Router } from 'express'
import controllers from '../controllers'
import validate from '../middlewares'

const router = Router()

router.get('/', controllers.getPlanets)
router.get('/:id', controllers.getPlanetById)
router.post('/', validate.planetValidation, controllers.createPlanet)
router.put('/:id', controllers.updatePlanet)
router.put('/:id/soft', controllers.softPlanetDelete)
router.delete('/:id', controllers.deletePlanet)

export default router
