const { Router } = require('express')
const controller = require('../controllers/postsController')
const {getCommentsFromPost} = require('../controllers/commentsController')
const {requireAdmin, requireUser} = require('../middleware/auth')

const router = Router()

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPostById)
router.post('/', controller.createPost)
router.put('/:id', controller.updatePostById)
router.delete('/:id', controller.deletePostById)

//comment routes
router.get('/:id/comments', getCommentsFromPost)

module.exports = router