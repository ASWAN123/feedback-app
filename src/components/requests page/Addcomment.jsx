import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Userdata } from "../context/Contextfuncs";
import toast, { Toaster } from 'react-hot-toast';

function Addcomment() {
  let { data, posts, setPosts, setdata } = useContext(Userdata) ;
  const  [ formValidation , setFormvalidation] = useState(false) ;
  let currentUser = JSON.parse(data)['currentUser'].username ;

  let [comment, setcomment] = useState({
    id: Math.floor(Date.now() / 1000),
    content: "",
    user: { ...JSON.parse(data)["currentUser"] },
  });

  const { id } = useParams();
  const notifysuccess = () => toast.success("Thank you for your comment")  ;
  const notifyError = () => toast.error("Comment can't be empty")      ;



  const addComment = (e) => {
    e.preventDefault();
    if(comment.content == ""){
      notifyError()
      return 
    }else{
    }
    
    let newposts = JSON.parse(data)["productRequests"].map((post) => {
      if (post.id == id) {
        post["comments"].push(comment);
      }
      return post;
    });
    setPosts(newposts);
    setcomment({
      id: Math.floor(Date.now() / 1000),
      content: "",
      user: { ...JSON.parse(data)["currentUser"] },
    })
    notifysuccess()
  };




  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-8 md:p-3 md:gap-2">
      <Toaster />
      <p className="font-bold text-[25px] mt-5 pl-2 md:text-[16px]">
        Add Comment
      </p>
      
      <form onSubmit={addComment} className="flex flex-col gap-4 " >
        <div className="group">
        { !currentUser && <span className="text-red-400">You must be logged in to add a comment</span> }
          <textarea
            value={comment.content}
            onChange={(e) => {

              if(250 - e.target.value.length < 0 ){
                setFormvalidation(true) ;
              }else{
                if(formValidation == true){
                  setFormvalidation(false) ;
                }
                setcomment({ ...comment, content: e.target.value });
              }
              
            }}
            className="placeholder:text-red-400 w-full normal-case shadow-sm shadow-gray-200 resize-none p-4 mt-3 cursor-pointer text-[16px] focus:outline-0  text-blue-600 h-[100px] rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400  "
            name=""
            id=""
            cols="10"
            rows="10"
            disabled ={ currentUser ? false : true }
            
          ></textarea>
          
        </div>
        <div className="group flex justify-between items-center p-1 md:flex-col md:justify-start md:items-start">
          
          { formValidation ? <span className="text-red-400  " >You executed the limit character in this field</span>   : <span className="text-gray-500">{ 250 - comment.content.length } character left</span>  }  
          <button
            disabled ={ currentUser ? false : true }
            type="submit"
            className=" md:text-[16px] md:p-3 font-bold hover:opacity-75 px-4 py-3 rounded-lg md:mt-1 md:mx-auto ml-auto bg-[#AC1EEA] text-white text-[16px]"
          >
            Post Comment
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default Addcomment;
