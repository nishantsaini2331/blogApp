import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const PostPage = () => {

    const [ postInfo, setPostInfo ] = useState({});//[ {title,subDescription, _id , createdAt, author, image, content}
    const params = useParams();
    useEffect(() => {
        const getPost = async () => {
            const res = await fetch(`http://localhost:3000/post/${params.id}`, {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json();
            setPostInfo(data);
            console.log(data);
            
        }
        getPost();
    }, []);
    
    if(!postInfo) return <div>loading...</div>

  return (
    <>
    <div className='flex flex-col gap-5'>
        <img src={`${postInfo.image}`} alt="" />
        <h1 className='text-5xl'>{postInfo.title}</h1>
        <p>{postInfo.subDescription}</p>
        <div  dangerouslySetInnerHTML={{__html:postInfo.content}} />
        {/* <p>{postInfo.author.userName}</p> */}
        <div>
            <Link to={`/edit/${postInfo._id}`} >Edit Post</Link>
        </div>
    </div>
    </>
  )
}

export default PostPage