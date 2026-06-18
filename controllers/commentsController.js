const prisma = require("../lib/prisma");

const getAllComments = async (req, res) => {
  const comments = await prisma.comment.findMany({});
  res.json(comments);
};

const getCommentsFromPost = async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { postId: Number(req.params.id) },
  });
  res.json(comments);
};

const getCommentsFromUser = async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { userId: Number(req.params.id) },
  });
  res.json(comments);
};

const getCommentById = async (req, res) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(req.params.id) },
    select: {
      id: true,
      content: true,
      user: {
        select: {
          username: true
        }
      }
    }
  });
  res.json(comment);
};

const createComment = async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      postId: Number(req.params.id),
      userId: req.user.id,
    },
    select: {
      id: true,
      content: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  res.json(comment);
};

const updateCommentById = async (req, res) => {
  const comment = await prisma.comment.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      content: req.body.content,
    },
  });
  res.json(comment);
};

const deleteCommentById = async (req, res) => {
  const comment = await prisma.comment.delete({
    where: { id: Number(req.params.id) },
  });
  res.json(comment);
};

module.exports = {
  getAllComments,
  getCommentsFromPost,
  getCommentsFromUser,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
};
