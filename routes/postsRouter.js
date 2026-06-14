const { Router } = require('express')
const controller = require('../controllers/postsController')
const {requireAdmin, requireUser, getLoggedUser} = require('../middleware/auth')

const router = Router()

router.get('/', getLoggedUser, controller.getAllPosts)
router.get('/:id', controller.getPostById)
router.post('/', requireAdmin, controller.createPost)
router.put('/:id', requireAdmin, controller.updatePostById)
router.delete('/:id', requireAdmin, controller.deletePostById)

//comment routes
router.get('/:id/comments', controller.getCommentsFromPost)
router.get('/:id/tags', controller.getTagsFromPost)

router.put('/:id/publish', requireAdmin, controller.publishPost)
router.put('/:id/hide', requireAdmin, controller.hidePost)

module.exports = router