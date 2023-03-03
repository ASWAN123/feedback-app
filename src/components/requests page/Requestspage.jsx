import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Userdata } from "../context/Contextfuncs";
import { BsArrowBarLeft } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import Comments from "./Comments";
import Addcomment from "./Addcomment";

function Requestspage() {
  
  let { data, posts, setPosts  , setData} = useContext(Userdata);
  const { id } = useParams() ;


  let feedback = posts.find((post) => post.id == id);

  useEffect(()=> {
    let newdata = JSON.parse(data)
    newdata['productRequests'] = posts
    setData(JSON.stringify(newdata))
  },[posts])




  return (
    <div className="w-[70%] flex flex-col  mx-auto p-4  gap-12 ">
      <Link to="/" className="flex gap-1 font-bold text-black ">
        <BsArrowBarLeft
          size={20}
          style={{ transform: "rotate(360deg)", color: "blue" }}
        />
        Go Back
      </Link>

      <div
        key={feedback.id}
        className="capitalize comments  w-full py-5 px-4 flex gap-8 items-center bg-white shadow-md rounded-lg"
      >
        <div
          className={` ${
            feedback.upvoted
              ? "bg-blue-400 text-white"
              : "bg-gray-200 text-black"
          } cursor-pointer rating h-[50px] border px-2 py-1 text-center mt-[-15px] rounded-lg `}
        >
          <MdOutlineArrowDropDown style={{ transform: "rotate(180deg)" }} />
          <span>{feedback.upvotes}</span>
        </div>
        <div className="details">
          <h3 className="m-1 font-bold text-[16px] cursor-pointer hover:text-purple-400">
            {feedback.title}
          </h3>
          <p className="m-1">{feedback.description}</p>
          <button className="m-1 px-3 py-1 rounded-lg bg-gray-200 text-blue-600 cursor-pointer hover:opacity-75 capitalize">
            {feedback.category}
          </button>
        </div>
        <div className="replies ml-auto mr-[5px] flex items-center gap-4 font-bold ">
          <FaCommentAlt style={{ color: "lightgray" }} />
          <span>{feedback.comments.length}</span>
        </div>
      </div>

      <Comments post = {feedback} />

      <Addcomment/>
    
          

    </div>
  );
}

export default Requestspage;
