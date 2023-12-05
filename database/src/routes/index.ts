import { Router } from 'express'
import controllers from '../controllers'
import validate from '../middlewares/validate'

const router = Router()

router.get('/:model', validate.validateModel, controllers.getDocumentList)

router.get('/:model/:id', validate.validateModel, controllers.getDocumentById)

router.post(
  '/:model',
  validate.validateModel,
  validate.validateFields,
  controllers.insertDocument
)

router.put('/:model/:id', validate.validateModel, controllers.updateDocument)

router.put(
  '/:model/:id/soft',
  validate.validateModel,
  controllers.softDocumentDelete
)

router.delete('/:model/:id', validate.validateModel, controllers.deleteDocument)

export default router
