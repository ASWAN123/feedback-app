import React, { useContext, useEffect, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { Userdata } from "./context/Contextfuncs";
import { Link } from "react-router-dom";

function Feedback() {
  let { posts , setPosts , data , setData } = useContext(Userdata);

  const handleUpvote = (x)=> {
    // x is the  id  of  the  post
    let newPosts = posts.map((post)=> {
      if(post.id == x){
        if(post.upvoted == true){
          post['upvotes'] = post['upvotes']-1
          post['upvoted'] = false
          return post
        }else{
          post['upvotes'] = post['upvotes'] + 1
          post['upvoted'] = true
          return post
        }

      }
      return post
    })
    setPosts(newPosts)
    setData(JSON.stringify({...JSON.parse(data) , productRequests:posts}))

  }

  // useEffect(()=>{
  //   setData(JSON.stringify({...JSON.parse(data) , productRequests:posts}))
  // }, [posts])


  return (
    <div className="flex flex-col w-full gap-4">
      {posts.map((feedback) => {
        return (
          <div
            key={feedback.id}
            className="capitalize comments  w-full py-5 px-4 flex gap-8 items-center bg-white shadow-md rounded-lg"
          >
            <div
              onClick={()=>{handleUpvote(feedback.id)}}
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
              <Link
                to={`/request/${feedback.id}`}
                className="m-1 font-bold text-[16px] cursor-pointer hover:text-purple-400"
              >
                {feedback.title}
              </Link>
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
        );
      })}
    </div>
  );
}

export default Feedback;
