const { Router } = require('express')
const controller = require('../controllers/resourceController')

const resourceRouter = Router()

resourceRouter.get("/", controller.resourceIndexGet)

module.exports = resourceRouter