import React from 'react'
import Post from '../Post'
import { useEffect,useState } from 'react'

const IndexPage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch("http://localhost:3000/post", {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json();
            setPosts(data);
            
        }
        getPosts();
    }, [])

  return (
    <>
        {posts.length > 0 ? (
            posts.map((post) => (
                <Post key={post._id} {...post} />
            ))
        ) : (
            <h1 className="text-3xl font-semibold text-center">No Posts</h1>
        )}
    </>
  )
}

export default IndexPage