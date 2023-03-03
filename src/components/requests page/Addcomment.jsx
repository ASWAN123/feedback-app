import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Userdata } from '../context/Contextfuncs'

function Addcomment() {
  let {data  ,  posts  ,  setPosts  , setdata } = useContext(Userdata)
  let [comment  ,  setcomment ] = useState({
    id:Math.floor(Date.now() / 1000) ,
    content:'' ,
    user:{...JSON.parse(data)['currentUser']}
  })

  const {id } = useParams()

  const addComment = (e)=>{
    console.log('clicked')
    e.preventDefault()
    let newposts = JSON.parse(data)['productRequests'].map((post) =>{
      if(post.id == id){
        post['comments'].push(comment)
      }
      return post
    } );

    setPosts(newposts)

  }
  
  
  return (
    <div className='flex flex-col gap-4 bg-white rounded-lg p-8 '>
        <p className='font-bold text-[25px] mt-5 pl-2'>Add Comment</p>
        <form onSubmit={addComment}  className='flex flex-col gap-4 '>
            <div className='group'>
                <textarea value={comment.content} onChange={(e)=>{setcomment({...comment , content:e.target.value})}} className='w-full normal-case shadow-sm shadow-gray-200 resize-none p-4 mt-3 cursor-pointer text-[16px] focus:outline-0  text-blue-600 h-[100px] rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400  ' name="" id="" cols="10" rows="10"></textarea>
            </div>
            <div className='group flex justify-between items-center p-1 '>
                <span className='text-gray-500'>256 character left</span>
                <button type='submit' className='hover:opacity-75 px-6 py-4 rounded-lg  ml-auto bg-purple-500 text-white text-[16px]'>Post Comment</button>
            </div>
            
        </form>
    </div>
  )
}

export default Addcomment