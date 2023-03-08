import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { Userdata } from "../context/Contextfuncs";
import { BsArrowBarLeft } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import Comments from "./Comments";
import Addcomment from "./Addcomment";
import toast, { Toaster } from 'react-hot-toast';

function Requestspage() {
  const notifyup = () => toast.success("Thank you for your feedback!");
  const notifydown = () => toast.success("No worries,");
  const notifyerror = () => toast.error("You must be logged in first");
  
  let { data, posts, setPosts  , setData} = useContext(Userdata);
  const { id } = useParams() ;
  let curentUser = JSON.parse(data)['currentUser'].username

  let feedback = posts.find((post) => post.id == id);

  useEffect(()=> {
    let newdata = JSON.parse(data)
    newdata['productRequests'] = posts
    setData(JSON.stringify(newdata))
  },[posts])


  const navigate = useNavigate();


  const handleUpvote = (x)=> {
    // x is the  id  of  the  post
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



  return (
    <div className="w-[70%] lg:w-[80%] md:w-[90%] sm:w-full flex flex-col  mx-auto p-4   gap-12 md:p-2 md:mt-2 ">
      <div className="flex justify-between items-center"> 
        <Link to="/" className="flex gap-1 font-bold text-black ">
          <BsArrowBarLeft
            size={20}
            style={{ transform: "rotate(360deg)", color: "blue" }}
          />
          Go Back
        </Link>
        { curentUser && curentUser == feedback.username  && <Link to= {`/add-feedback/edit/${feedback.id}`} className=" md:text-[16px] md:p-2 p-3 text-[16px] font-bold text-white border rounded-lg bg-[#AC1EEA]"  >Edit Feedback</Link> } 
      </div>
      <div
        // key={feedback.id}
        className="capitalize comments md:p-2 w-full py-5 px-4 flex gap-8 md:gap-4 sm:gap-2 items-center bg-white shadow-md rounded-lg"
      >
        <div
          onClick={ curentUser ? ()=>{handleUpvote(feedback.id)} : notifyerror } 
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
