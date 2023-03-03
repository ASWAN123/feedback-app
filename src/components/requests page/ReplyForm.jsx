import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Userdata } from '../context/Contextfuncs'

function ReplyForm(props) {
  let [replyto , comemntId] = props.replyTo
  let closeform = props.closeform
  let {data  , setData  ,  posts  , setPosts} = useContext(Userdata)

  const {id} = useParams()
  
  let [reply , setReply] = useState({
    content: '',
    replyingTo:replyto ,
    user: {...JSON.parse(data)['currentUser']}
  })

  const handlereplySubmit = ()=> {
    let newposts = JSON.parse(data)['productRequests'].map((post) =>{
      if(post.id == id){
        post.comments.map((comment)=> {
          if(comment.id  == comemntId){
            let dofast = comment['replies'] ?  comment['replies'].push(reply) : comment['replies'] = [reply]  ;
            return comment
          }
          return comment
        })
        return post
      }
      return post
    } );

    setPosts(newposts)

    closeform([false , -1])

  }


  return (
        <div className='postreply flex items-center gap-4 '>
            <textarea value={reply.content} onChange={(e)=> {setReply({...reply , content:e.target.value})}}  className='w-[80%] normal-case shadow-sm shadow-gray-200 resize-none p-4 mt-3 cursor-pointer text-[16px] focus:outline-0  text-blue-600 h-[100px] rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400  ' name="" id="" cols="10" rows="10"></textarea>
            <button onClick={handlereplySubmit} className='w-[20%] hover:opacity-75  px-2 py-2  rounded-lg  ml-auto bg-purple-500 text-white text-[16px]'>post Reply</button>
        </div>  
 )
}

export default ReplyForm