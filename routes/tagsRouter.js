const {Router} = require('express')
const controller = require('../controllers/tagsController')
const {requireAdmin} = require('../middleware/auth')

const router = Router()

router.get('/', controller.getAllTags)
router.get('/:id', controller.getTagById)
router.post('/', requireAdmin, controller.createTag)
router.put('/:id', requireAdmin, controller.updateTagById)
router.delete('/:id', requireAdmin, controller.deleteTagById)
router.get('/:id/posts', controller.getPostsFromTag)

module.exports = router