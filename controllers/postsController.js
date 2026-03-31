const prisma = require('../lib/prisma')

const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({})
    res.json(posts)
}

const getPostById = async (req, res) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(req.params.id) }
    })
    res.json(post)
}

const createPost = async (req, res) => {
    const post = await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content
        }
    })
    res.json(post)
}

const updatePostById = async (req, res) => {
    const post = await prisma.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            title: req.body.title,
            content: req.body.content
        }
    })
    res.json(post)
}

const deletePostById = async (req, res) => {
    const deletePost = await prisma.post.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(deletePost)    //returns deleted post
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById
}