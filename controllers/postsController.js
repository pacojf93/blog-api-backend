const prisma = require('../lib/prisma')

const getAllPosts = async (req, res) => {

    const filter = req.user && req.user.isAdmnin
        ? {}
        : { isPublished: true }

    const posts = await prisma.post.findMany({
        where: filter,
        select: {
            id: true,
            created: true,
            updated: true,
            title: true,
            abstract: true,
            isPublished: true,
            userId: true
        }
    })
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
            abstract: req.body.abstract,
            content: req.body.content,
            userId: Number(req.body.userId)
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

const getTagsFromPost = async (req, res) => {
    const {tags} = await prisma.post.findUnique({
        where: { id: Number(req.params.id) },
        select: {
            tags: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    res.json(tags)
}

const getCommentsFromPost = async (req, res) => {
    const {comments} = await prisma.post.findUnique({
        where: { id: Number(req.params.id) },
        select: {
            comments: {
                select: {
                    id: true,
                    content: true,
                    user: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                }
            }
        }
    })
    res.json(comments)
}

const publishPost = async (req, res) => {
    const post = await prisma.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            isPublished: true
        },
        select:{
            id: true,
            title: true,
            abstract: true,
            isPublished: true,
            userId: true
        }
    })
    res.json(post)
}

const hidePost = async (req, res) => {
    const post = await prisma.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            isPublished: false
        },
        select:{
            id: true,
            title: true,
            abstract: true,
            isPublished: true,
            userId: true
        }
    })
    res.json(post)
}

const addTag = async (req, res) => {
    const post = await prisma.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            tags: {
                connect: {
                    id: Number(req.body.tag)
                }
            }
        },
        select: {
            tags: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    res.json(post)
}

const removeTag = async (req, res) => {
    const post = await prisma.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            tags: {
                disconnect: {
                    id: Number(req.body.tag)
                }
            }
        },
        select: {
            tags: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    res.json(post)
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById,
    getTagsFromPost,
    getCommentsFromPost,
    publishPost,
    hidePost,
    addTag,
    removeTag
}