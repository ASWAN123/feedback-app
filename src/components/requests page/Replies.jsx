import React, { useContext, useState } from 'react'
import { Userdata } from '../context/Contextfuncs'
import ReplyForm from './ReplyForm'

function Replies(props) {
    let {data  , setData  ,  posts , setPosts} = useContext(Userdata)

    let comment = props.comment 
    let setreplyTo = props.setreplyTo ; 
    let replyTo = props.replyTo ;
    let setShowForm = props.setShowForm ;

    let [showReplyForm ,  setShowReplyForm] = useState([false , -1])
    

    let activeuser = JSON.parse(data)['currentUser'].username


    const HandReplyform = (x , y , z)=> {
        if(showReplyForm[0] == true && x !== showReplyForm[1]){
            setShowReplyForm([true , x])
            setreplyTo(y , z)
        }else{
            setShowReplyForm([!showReplyForm[0] , x])
            setreplyTo([y , z])
        }
        
    }


    return (
        <div className='replies my-3 border-l px-2 flex flex-col gap-6 md:my-1 sm:m-1/2 md:p-0 '>
            { comment.replies.map((reply , index) => {
                return (
                    <div key={index} className='reply  mb-3 flex flex-col '>
                        <div className='flex gap-4'>
                            <img className='w-[50px] h-[50px] rounded-full' src={reply.user.image} alt="" />
                            <div className='info'>
                            <h4 className='font-bold'>{reply.user.name}</h4>
                            <span className='text-gray-500'>@{reply.user.username}</span>
                            </div>
                            {reply.user.username !== activeuser &&  <button className='text-blue-600 ml-auto font-medium cursor-pointer md:pr-2' onClick={()=>{HandReplyform(index , reply.user.username , comment.id)}} >Reply</button>}
                        </div>
                        <div className='flex flex-col w-full ml-auto gap-2 pl-[4.2rem] mt-1 md:p-1 md:pr-2 '>
                            <p className=''><span className='text-purple-600 font-bold  '>@{ reply.replyingTo } </span>{reply.content}</p>
                            { showReplyForm[0] && showReplyForm[1] == index &&  <ReplyForm  replyTo={replyTo} closeform = {setShowReplyForm} /> }
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default Replies