import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  



  const [postInfo, setPostInfo] = useState({}); //[ {title,subDescription, _id , createdAt, author, image, content}
  const params = useParams();
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`http://localhost:3000/post/${params.id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setPostInfo(data);
      setIsAuthor(data?.author?.userName)
    };
    getPost();


  }, []);

  const deletePost = async () => {
    const res = await fetch(`http://localhost:3000/post/${params.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    // if(res.status !== 200){
    //     isAdmin = false;
    // }

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      toast.success(data);
      navigate(`/`);
    } else {
      toast.error(data.message);
    }
  };

  if (!postInfo) return <div>loading...</div>;


  const verify = async () => {
    const res = await fetch(`http://localhost:3000/verify/${params.id}`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 200) 
    {
      setIsAdmin(true);
    }
    
  };
  verify()

    

  return (
    <>
      <div className="flex flex-col gap-5">
        <img className='rounded-xl ' src={`${postInfo.image}`} alt="" />
        <h1 className="text-5xl">{postInfo.title}</h1>
        <p className=" relative -top-[11px] text-xl  ">by @{`${isAuthor}`}</p>
        <p className="text-xl " >{postInfo.subDescription}</p>
        {isAdmin && (
          <div className="flex w-[30%] justify-between gap-2 text-xl">
            <button className="bg-blue-300 rounded-md  p-2 w-full">
              <Link to={`/edit/${postInfo._id}`}>Edit Post</Link>
            </button>
            <button className="bg-red-500 p-2 rounded-md   w-full" onClick={deletePost}>Delete Post</button>
          </div>
        )}
        <div className="text-lg " dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        {/* <p>{postInfo.author.userName}</p> */}
        {/* <div>
            <Link to={`/edit/${postInfo._id}`} >Edit Post</Link>
        </div> */}


        <Toaster />
      </div>
    </>
  );
};

export default PostPage;
