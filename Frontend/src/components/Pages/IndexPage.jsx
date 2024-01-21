import React from 'react'
import Post from '../Post'
import { useEffect,useState } from 'react'

const IndexPage = () => {
    const url = import.meta.env.VITE_BACKEND
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch(`${url}/post`, {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json();
            setPosts(data);
            // console.log(data)
            
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