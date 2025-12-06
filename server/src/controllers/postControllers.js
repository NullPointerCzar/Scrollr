import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  try {
    const {text} = req.body
    const post = await Post.create({text, author: req.user._id })
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({message: "error.message"})
  }
}

export const getAllPosts = async (req,res) => {
  try {
    const posts = await Post.find().populate("author","username avatar").sort({createdAt:-1})
    res.json(posts)
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
}