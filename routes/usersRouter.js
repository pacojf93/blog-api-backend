const {Router} = require('express')
const {signUp, logIn, logOut, getUsers, getUserById, deleteUserById} = require('../controllers/usersController')
const {requireAdmin, requireUser} = require('../middleware/auth')
const {getCommentsFromUser} = require('../controllers/commentsController')

const router = Router()

router.post('/sign-up', signUp)
router.post('/log-in', logIn)
router.get('/log-out', logOut)
router.get('/:id', requireAdmin, getUserById)
router.get('/:id/comments',  getCommentsFromUser)
router.delete('/:id', requireAdmin, deleteUserById)
router.get('/', requireAdmin, getUsers)

module.exports = router
