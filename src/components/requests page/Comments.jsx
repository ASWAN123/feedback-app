import React, { useContext, useEffect, useState } from 'react'
import { Userdata } from '../context/Contextfuncs'
import Replies from './Replies'
import ReplyForm from './ReplyForm'

function Comments({post}) {
  
  
  let {posts , setPosts , data ,  setData } = useContext(Userdata)
  let activeuser = JSON.parse(data)['currentUser'].username
  let [ replyTo , setreplyTo ]  = useState([]) 

  let [showForm ,  setShowForm] = useState([false , -1]) 


  const Handform = (x, y  , z )=> { 
        if(showForm[0] == true && x !== showForm[1]){
          setShowForm([true , x])
          setreplyTo(y , z)
        }else{
          setShowForm([!showForm[0] , x])
          setreplyTo([y , z])
        }
  }

  // useEffect(()=> {
  //   let newdata = JSON.parse(data)
  //   newdata['productRequests'] = posts
  //   setData(JSON.stringify(newdata))
  // },[posts])



  return (
    <div className='w-full  bg-white rounded-lg shadow-md p-4 '>
      { post.comments.length >  0 &&  <p className='font-bold  text-[2rem] px-4 py-4 '>{post.comments.length} Comment</p> }
      {post.comments.length < 1 && <p className='font-bold text-[25px] px-4 py-4'>Be the first one to Comment!</p>}
      {
        post.comments.map((comment , index)=> {
          return (
            <div key={comment.id} className='comment flex flex-col justify-center p-2 border-b last:border-b-0'>
              <div className='flex gap-4 p-4'>
              <img className='w-[50px] h-[50px] rounded-full' src={comment.user.image.replace('./','/')} alt="" />
              <div className='info'>
                <h4 className='font-bold'>{comment.user.name}</h4>
                <span className='text-gray-500'>@{comment.user.username}</span>
              </div>
              { comment.user.username != activeuser && <button className='text-blue-600 ml-auto font-medium cursor-pointer' onClick={()=>{Handform(index , comment.user.username , comment.id)}} >Reply</button>}
              </div>
              <div className='w-full ml-auto flex flex-col gap-2 pl-[5rem]'>
                <p className=''>{comment.content}</p>
                {showForm[0]== true && showForm[1] == index  &&  <ReplyForm replyTo={replyTo} closeform = {setShowForm}/> }
                { comment.replies && comment.replies.length > 0 && <Replies setreplyTo={setreplyTo} replyTo={replyTo} setShowForm = {setShowForm} comment={comment} /> }
              </div>
            </div>

          )
        })
      }

    </div>
  )
}

export default Comments