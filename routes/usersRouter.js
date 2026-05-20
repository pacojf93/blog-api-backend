const {Router} = require('express')
const {signUp, logIn, logOut, getUsers, getUserById, deleteUserById} = require('../controllers/usersController')
const {requireAdmin} = require('../middleware/auth')

const router = Router()

router.post('/sign-up', signUp)
router.post('/log-in', logIn)
router.get('/log-out', logOut)
router.get('/:id', requireAdmin, getUserById)
router.delete('/:id', requireAdmin, deleteUserById)
router.get('/', requireAdmin, getUsers)

module.exports = router
