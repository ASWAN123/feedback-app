import React, { useContext, useState } from 'react'
import { MdOutlineArrowDropDown } from "react-icons/md";
import  { FaCommentAlt } from "react-icons/fa" ;
import { Userdata } from './context/Contextfuncs';

function Comments() {
  let { posts } = useContext(Userdata)

  


  return (
    <div className="flex flex-col w-full gap-4">
      {
        posts.map((feedback)=> {
          return (
            <div key={feedback.id} className='capitalize comments  w-full py-5 px-4 flex gap-8 items-center bg-white shadow-md rounded-lg'>
              <div className='cursor-pointer rating h-[50px] border px-2 py-1 text-center mt-[-15px] rounded-lg bg-gray-200 '>< MdOutlineArrowDropDown style={{'transform':'rotate(180deg)'}}/><span>{feedback.upvotes}</span></div>
              <div className='details'>
                <h3 className='m-1 font-bold text-[16px] cursor-pointer hover:text-purple-400'>{feedback.title}</h3>
                <p className='m-1'>{feedback.description}</p>
                <button className='m-1 px-3 py-1 rounded-lg bg-gray-200 text-blue-600 cursor-pointer hover:opacity-75 capitalize'>{feedback.category}</button>
              </div>
              <div className='replies ml-auto mr-[5px] flex items-center gap-4 font-bold ' >
                < FaCommentAlt style={{color:"lightgray"}}/>
                <span>{feedback.comments.length}</span>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default Comments