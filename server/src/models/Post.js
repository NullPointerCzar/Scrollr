import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  text: {type: String, required: 1},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: 1},
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Post", postSchema)
