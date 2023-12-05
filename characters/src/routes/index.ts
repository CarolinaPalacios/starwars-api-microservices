import { Router } from 'express'
import controllers from '../controllers'
import middlewares from '../middlewares'

const router = Router()

router.get('/', controllers.getCharacters)

router.get('/:id', controllers.getCharacterById)

router.post('/', middlewares.characterValidation, controllers.createCharacter)

router.put('/:id', controllers.updateCharacter)

router.put('/:id/soft', controllers.softCharacterDelete)

router.delete('/:id', controllers.deleteCharacter)

export default router
