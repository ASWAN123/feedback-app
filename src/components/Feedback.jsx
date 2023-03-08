import React, { useContext, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { Userdata } from "./context/Contextfuncs";
import { Link } from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';

function Feedback() {
  let { posts , setPosts , data , setData } = useContext(Userdata);
  let curentUser = JSON.parse(data)["currentUser"].username;

  const notifyup = () => toast.success("Thank you for your feedback!");
  const notifydown = () => toast.success("No worries,");
  const notifyerror = () => toast.error("You must be logged in first");

  const handleUpvote = (x)=> {
    // x is the  id  of  the  post
    if( curentUser ){
    let newPosts = posts.map((post)=> {
      if(post.id == x){
        if(post.upvoted == true){
          post['upvotes'] = post['upvotes']-1
          post['upvoted'] = false
          notifydown()
          return post
        }else{
          post['upvotes'] = post['upvotes'] + 1
          post['upvoted'] = true
          notifyup()
          return post
        }

      }
      return post
    })
    setPosts(newPosts)
    setData(JSON.stringify({...JSON.parse(data) , productRequests:posts}))
    }

  }




  return (
    <div className="flex flex-col w-full gap-4 md:mt-10 sm:mt-[120px] md:p-4 ">
      <Toaster />
      {posts.map((feedback) => {
        return (
          <div
            key={feedback.id}
            // start working  in here
            
            className="capitalize w-full py-5 px-4 flex md:grid  md:grid-cols-5	md:grid-flow-row-dense md:gap-6 gap-8 items-center bg-white shadow-md rounded-lg"
          >
            <div
              title = {curentUser ? "" : "You must be logged in to vote on this  feedback"}
              onClick={ curentUser ? ()=>{handleUpvote(feedback.id)} : notifyerror } 
              className={` ${
                feedback.upvoted
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200 text-black"
              } cursor-pointer 	md:order-last rating h-[50px] border px-2 py-1  md:flex  md:justify-center md:p-1 md:items-center md:flex-row md:gap-1 md:ml-1 md:w-[60px] md:h-auto flex flex-col items-center text-center mt-[-15px] rounded-lg `}
            >
              <MdOutlineArrowDropDown style={{ transform: "rotate(180deg)" , color:'blue'  }} />
              <button>{feedback.upvotes}</button>
            </div>
            <div className="details md:col-span-4">
              <Link
                to={`/request/${feedback.id}`}
                className="m-1 font-bold text-[16px] cursor-pointer hover:text-purple-400"
              >
                {feedback.title}
              </Link>
              <p className="m-1 ">{feedback.description}</p>
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
