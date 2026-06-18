const prisma = require('../lib/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const passwordHashing = async pass => {
    const hashedPass  = await bcrypt.hash(pass, 10)
    return hashedPass
}

const signUp = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            hashedPassword: await passwordHashing(req.body.password)
        }
    })
    res.json(user)
}

const logIn = async (req, res) => {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
        where: {username: username},
    })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword)


    if (! (user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        {expiresIn: 60*60}
    )

    res.status(200).send({token, username: user.username, id: user.id})

}

const logOut = async (req, res) => {

}

const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {id: true, username: true}
    })
    res.json(users)
}

const getUserById = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {id: Number(req.params.id)},
        select: {id: true, username: true, isAdmnin: true}
    })
    res.json(user)
}

const deleteUserById = async (req, res) => {
    const {hashedPassword, ...rest} = await prisma.user.delete({
        where: {id: Number(req.params.id)}
    })
    res.json(rest)
}

const getCommentsFromUser = async (req, res) => {
    const {comments} = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
        select: {
            comments: {
                select: {
                    id: true,
                    content: true,
                    post: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            }
        }
    })
    res.json(comments)
}

module.exports = {
    signUp,
    logIn,
    logOut,
    getUsers, 
    getUserById,
    deleteUserById,
    getCommentsFromUser
}