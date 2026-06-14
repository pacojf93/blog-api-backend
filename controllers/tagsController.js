const { tag } = require('../lib/prisma')

const getAllTags = async (req, res) => {
    const tags = await tag.findMany({})
    res.json(tags)
}

const getTagById = async (req, res) => {
    const t = await tag.findUnique({
        where: {id: Number(req.params.id)}
    })
    res.json(t)
}

const createTag = async (req, res) => {
    const t = await tag.create({
        data: {
            name: req.body.name
        }
    })
    res.json(t)
}

const updateTagById = async (req, res) => {
    const t = await tag.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            name: req.body.name
        }
    })
    res.json(t)
}

const deleteTagById = async (req, res) => {
    const t = await tag.delete({
        where: { id: Number(req.params.id)}
    })
    res.json(t)
}

const getPostsFromTag = async (req, res) => {
    const {posts} = await tag.findUnique({
        where: {id: Number(req.params.id)},
        select: {
            posts: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    res.json(posts)
}

module.exports =  {
    getAllTags,
    getTagById,
    createTag,
    updateTagById,
    deleteTagById,
    getPostsFromTag
}