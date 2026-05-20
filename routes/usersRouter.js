const {Router} = require('express')
const controller = require('../controllers/usersController')
const {requireAdmin, requireUser} = require('../middleware/auth')


const router = Router()

router.post('/sign-up', controller.signUp)
router.post('/log-in', controller.logIn)
router.get('/log-out', controller.logOut)
router.get('/:id', requireAdmin, controller.getUserById)
router.get('/:id/comments',  controller.getCommentsFromUser)
router.delete('/:id', requireAdmin, controller.deleteUserById)
router.get('/', requireAdmin, controller.getUsers)

module.exports = router
