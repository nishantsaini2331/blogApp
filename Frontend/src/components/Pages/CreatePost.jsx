import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Quill from "../Quill";
import { RotatingLines } from "react-loader-spinner";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subDescription", subDescription);
    formData.append("content", content);
    formData.append("image", image[0]);

    setLoading(true);

    const res = await fetch("http://localhost:3000/add-post", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 400 || !data) {
      toast.error(data.message);

    } else {
      toast.success(data.message);
      navigate("/");
    }


  };



  return (
    <div className="flex justify-center flex-col items-center  gap-4   ">
      <h1 className="text-5xl font-semibold mb-6 text-center">Create Post</h1>
      <form
        onSubmit={createNewPost}
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

        {
            loading ? <RotatingLines /> : <button className="bg-blue-500 text-white px-5 py-3 rounded-xl text-2xl">
            Create Post
            </button>
            
        }

        <Toaster />
      </form>
    </div>
  );
};

export default CreatePost;
