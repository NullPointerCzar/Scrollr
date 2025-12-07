import { useEffect, useState, useContext } from "react";
import { createPost, getPosts, deletePost } from "../api/posts";
import { AuthContext } from "../context/AuthContext";

export default function Feed() {
  const [text, setText] = useState("")
  const [posts, setPosts] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [error, setError] = useState("")
  const { user } = useContext(AuthContext)

  const fetchPosts = async ()=>{
    const res = await getPosts()
    setPosts(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) return;
    await createPost(text)
    setText("")    // clearing the input box after create a post
    fetchPosts()
  }

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setDeleting(postId)
    setError("")
    try {
      await deletePost(postId)
      setPosts(posts.filter(p => p._id !== postId))
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete post")
    } finally {
      setDeleting(null)
    }
  }

  useEffect(()=>{fetchPosts()}, [])

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's up?"
          className="w-full border rounded p-2 mb-2 resize-none focus:outline-none focus:ring"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <strong className="block text-gray-800">{p.author.username}</strong>
              {user && user._id === p.author._id && (
                <button
                  onClick={() => handleDelete(p._id)}
                  disabled={deleting === p._id}
                  className="text-red-600 hover:text-red-800 text-sm font-medium transition disabled:opacity-50"
                >
                  {deleting === p._id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
            <p className="mt-2 text-gray-700">{p.text}</p>
            <small className="block mt-2 text-gray-500">{new Date(p.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}