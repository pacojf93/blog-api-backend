const prisma = require('../lib/prisma')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getTokenFrom = req => {
    const auth = req.get('authorization')
    if(auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    }
    return null
}

const requireAdmin = async (req, res, next) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({error: 'token invalid'})
    }

    const user = await prisma.user.findUnique({
        where: {id: decodedToken.id}
    })

    if(!user) {
        return res.status(400).json({error: 'user id missing or not valid'})
    }

    if(!user.isAdmnin) {
        
        return res.status(400).json({error: 'you need admin privileges to acces this site'})
    }

    req.user = user

    next()
}

module.exports = { requireAdmin }