const {Router} = require('express')
const controller = require('../controllers/commentsController')
const {requireAdmin, requireUser} = require('../middleware/auth')

const router = Router()

router.get('/', controller.getAllComments)
router.get('/:id', controller.getCommentById)
router.post('/:id', requireUser, controller.createComment)
router.put('/:id', requireAdmin, controller.updateCommentById)
router.delete('/:id', requireAdmin, controller.deleteCommentById)

module.exports = router