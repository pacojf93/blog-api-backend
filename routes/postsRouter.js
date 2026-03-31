const { Router } = require('express')
const controller = require('../controllers/postsController')

const router = Router()

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPostById)
router.post('/', controller.createPost)
router.put('/:id', controller.updatePostById)
router.delete('/:id', controller.deletePostById)

//comment routes
router.get('/:id/comments', () => { })
router.get('/:id/comments/:id', () => { })
router.post('/:id/comments', () => { })
router.put('/:id/comments/:id', () => { })
router.delete('/:id/comments/:id', () => { })

module.exports = router