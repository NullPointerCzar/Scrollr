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

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Find post
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Check if user is the post author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }
    
    // Delete post
    await Post.findByIdAndDelete(postId);
    
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: error.message });
  }
}