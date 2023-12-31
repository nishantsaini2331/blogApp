import React from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
    ],
  }
   
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


const Quill = ({value, onChange}) => {
  return (
    <ReactQuill 
    value={value}
    onChange={onchange}
    modules={modules}
    formats={formats}
    theme="snow"
    placeholder="Write something awesome..."
    className="border-2  px-5 py-3 w-full bg-[#eee] text-2xl rounded-xl"
/>
  )
}

export default Quill