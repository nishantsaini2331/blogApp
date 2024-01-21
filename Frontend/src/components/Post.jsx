import React, {useState} from "react";
import { Link } from "react-router-dom";
import { AiTwotoneLike, AiTwotoneDislike   } from "react-icons/ai";

const Post = ({ title, subDescription, _id, createdAt, author, image }) => {
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();
  const dateStr = `${day}/${month}/${year}`;
  const authorName = author?.userName;
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

    const like = () => {
        console.log("Like")
        setLikeCount(likeCount + 1)

    }
    const dislike = () => {
        console.log("dislike")
        setDislikeCount(dislikeCount + 1)
    }


  return (
    <div className="grid grid-cols-1 w-full mb-10 gap-5 sm:grid-cols-2  ">
      <div className="max-w-full">
        <Link to={`/post/${_id}`}>
          <img className="max-w-full rounded-md" src={`${image}`} alt="" />
        </Link>
      </div>
      <div className="">
        <Link to={`/post/${_id}`}>
          <h2 className="text-3xl font-semibold">{title}</h2>
        </Link>
        <p className="font-bold mt-2 flex gap-2 text-neutral-700  ">
          <Link href="">{authorName}</Link>
          <p>
            {dateStr} {time}
          </p>
        </p>
        <p className="text-lg mt-2 ">{subDescription}</p>
        <div className="flex items-center gap-10 mt-3     ">
            {
                likeCount === 0 ? 
                <p onClick={like }className="scale-[2] flex items-center gap-1">{< AiTwotoneLike />} </p> : 
                <p onClick={like }className="scale-[2] flex items-center gap-1">{< AiTwotoneLike />} {likeCount}</p>
            }
            {
                dislikeCount === 0 ? 
                <p onClick={dislike }className="scale-[2] flex items-center gap-1">{< AiTwotoneDislike />} </p> : 
                <p onClick={dislike }className="scale-[2] flex items-center gap-1">{< AiTwotoneDislike />} {dislikeCount}</p>
            }
            {/* <p onClick={like }className="scale-[2] flex items-center gap-1">{< AiTwotoneLike />} {likeCount === 0 ? } </p>
            <p onClick={dislike} className="scale-[2] flex items-center gap-1">{<AiTwotoneDislike/>} {dislikeCount}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
