import { useEffect, useState } from "react";
import { createPost, getPosts } from "../api/posts";

export default function Feed() {
  const [text, setText] = useState("")
  const [posts, setPosts] = useState([])

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

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <strong className="block text-gray-800">{p.author.username}</strong>
            <p className="mt-2 text-gray-700">{p.text}</p>
            <small className="block mt-2 text-gray-500">{new Date(p.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}