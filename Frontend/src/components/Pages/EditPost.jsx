import React, { useEffect } from 'react'
import { useState, } from "react";
import { toast,Toaster } from "react-hot-toast";
import  Quill from "../Quill";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
    const url = import.meta.env.VITE_BACKEND
    const [title, setTitle] = useState("");
    const [subDescription, setSubDescription] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getPost = async () => {
            const res = await fetch(`${url}/post/${params.id}`, {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json();
            setTitle(data.title);
            setSubDescription(data.subDescription);
            setContent(data.content);

        
        }
        getPost();
    }, []);

    const updatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subDescription", subDescription);
        formData.append("content", content);
        formData.append("id", params.id);
        if(image?.[0]){
            formData.append("image", image?.[0]);
        }

        const res = await fetch(`${url}/add-post`, {
            method: "PUT",
            body: formData,
            credentials: "include",
        });

        const data = await res.json();
        // console.log(data);
        if(res.status === 400 || !data){
            toast.error(data.message);
        }
        else{
            toast.success(data.message);
            navigate(`/post/${params.id}`);
        }
    };



    return (
        <div className="flex justify-center flex-col items-center  gap-4   ">
          <h1 className="text-5xl font-semibold mb-6 text-center">Edit Post</h1>
          <form
          onSubmit={updatePost}
            
            className="flex justify-center w-full flex-col items-center  gap-4   "
          >
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
              type="text "
              className="border-2  px-5 py-3 w-full bg-[#eee] text-2xl rounded-xl"
              placeholder="Title"
            />
            <input
            value={subDescription}
            onChange={(e) => setSubDescription(e.target.value)}
              type="text"
              className="border-2  px-5 py-3 w-full bg-[#eee] text-2xl rounded-xl"
              placeholder="short description"
            />
            <input
            onChange={(e) => setImage(e.target.files)}
    
              type="file"
              className="border-2  px-5 py-3 w-full bg-[#eee] text-2xl rounded-xl"
              placeholder="Image"
            />
            <Quill value={content} onChange={setContent} />
            <button
              type="submit"
              className="border-2  px-5 py-3 w-full bg-blue-500  text-2xl  rounded-xl"
            >
                Update Post
            </button>
            <Toaster/>
          </form>
        </div>
      );
    };
    

export default EditPost