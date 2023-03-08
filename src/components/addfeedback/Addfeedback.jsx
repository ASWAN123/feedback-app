import React, { useContext,  useEffect,  useState } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { json, Link , useNavigate, useParams} from "react-router-dom";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Userdata } from "../context/Contextfuncs";
import toast, { Toaster } from 'react-hot-toast';
 
const Addfeedback = () => {
  let { data , setData ,  posts , setPosts } = useContext(Userdata) ;
  let currentUser = JSON.parse(data)['currentUser'].username ;
  let [drop, setDrop] = useState(false) ;
  const navigate = useNavigate() ;
  const { id } = useParams() ;


  



  // form validation
  let [titleValidation , setTitleValidation] = useState(false)
  let [descriValidation , setDescriValidation] = useState(false)

  // end validation
  

  const HandleDrop = ()=> {
    setDrop(!drop)
  }
  let feedback = posts.find((post) => post.id == id)
  let myfeedback = id ? {...feedback} : {
    id:Math.floor(Date.now() / 1000) ,
    title:'',
    category:'feature',
    upvotes:0 ,
    upvoted:false ,
    status:'suggestion' ,
    description:'' ,
    comments:[]  ,
    username : currentUser 
  }



  useEffect(()=> {
    if( !myfeedback.username && myfeedback.username != currentUser){
      navigate( `/Errorpage` )
    }
  })


  
  let [newPost ,  setNewPost] = useState(myfeedback)
  
  const notify = () => toast.success('Successfully toasted!') ;



  const savedata = (e)=> {
    e.preventDefault()
    if(newPost.title == ""){
      setTitleValidation(true)
      return 
    }
    if(newPost.description == ''){
      setDescriValidation(true)
      return 
    }
    setPosts([...JSON.parse(data)['productRequests'] , newPost])
    navigate( `/request/${newPost.id}` )    
  }


  const  updatedata  = (e)=> {
    e.preventDefault()
    let newposts = posts.map((post)=> {
      if(post.id  == id ){
        return newPost
      }
      return post
    })

    setPosts(newposts)
    navigate(`/request/${feedback.id}`)
  }


  const deletefeedback = (e)=> {
    e.preventDefault()
    let newposts = posts.filter((post)=> post.id != feedback.id )
    setPosts(newposts)
    navigate( `/` )

  }





  return (
    <div className="w-[70%] flex flex-col  mx-auto p-4  gap-12 md:w-full md:p-2 md:mt-2 md:gap-8 ">
      <Toaster />

      <Link to="/" className="flex gap-1 font-bold text-black ">
        <BsArrowBarLeft
          size={20}
          style={{ transform: "rotate(360deg)", color: "blue" }}
        />
        Go Back
      </Link>
      
 
      <div className="border flex flex-col rounded-lg shadow-md bg-white  ">
        <div className="text-[25px] h-[40px] w-[40px] rounded-full border text-white text-center pt-[4px] mt-[-20px] ml-[15px] bg-gradient-to-r from-blue-500 to-pink-500 ">
          +
        </div>
        <form
          className="flex flex-col gap-8 p-4 "
          onSubmit={ id ? updatedata : savedata}
        >
          <p className="font-bold text-[25px] mt-5 pl-2 md:text-[24px] ">Create New Feedback</p>

          <div className="group  flex flex-col p-1 gap-1 ">
            <label htmlFor="title" className="font-bold text-[18px] ">
              Feedback Title
            </label>
            { titleValidation ? <span className="text-[16px] text-red-400 ">Title Required</span>   : <span className="text-gray-400 ">
              Add a short , descriptive healine
            </span> }
            <input
              value={newPost.title}
              onChange={(e)=> {setNewPost({...newPost , title:e.target.value}) ; setTitleValidation(false) }}
              type="text"
              name="title"
              className=" shadow-sm shadow-gray-200 capitalize mt-3 text-[16px] text-blue-600 h-[50px] p-4 rounded-md bg-[#F7F9FC] focus:outline-0 focus:border-[1px] border-blue-400  "
            />
          </div>

          <div className="group flex flex-col p-1 gap-1 relative ">
            <label htmlFor="cat" className="font-bold text-[18px] ">
              Category
            </label>
            <span className="text-gray-400 ">
              Choose a category for your feedback
            </span>
            <div onClick={HandleDrop} className=" shadow-sm shadow-gray-200 flex justify-between mt-3 cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2 rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400 ">
              <button type ="button" className="capitalize w-full text-start">{newPost.category}</button>
              <MdOutlineArrowDropDown size={20} />
            </div>
            <div
              className={`dropdown-menu text-black  bg-white flex flex-col rounded-lg shadow-[0_0_10px_1px_gray] ml-1 w-[98%] mt-[130px] sm:ml-0 ${
                drop ? "absolute" : "hidden"
              } `}
            >
              <p onClick={(e)=> {setNewPost({...newPost , category:e.target.textContent }); setDrop(!drop)}}  className=" capitalize cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2   border-b hover:text-purple-400 ">
                feature
              </p>
              <p onClick={(e)=> {setNewPost({...newPost , category:e.target.textContent }); setDrop(!drop) }} className=" capitalize cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2    border-b hover:text-purple-400 ">
                enhancement
              </p>
              <p onClick={(e)=> {setNewPost({...newPost , category:e.target.textContent }); setDrop(!drop)}} className=" capitalize cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2   border-b hover:text-purple-400 ">
                bug
              </p>
            </div>
          </div>

          <div className="group flex flex-col p-1 gap-1 ">
            <label htmlFor="description" className="font-bold text-[18px] ">
              Feedback Detail
            </label>
            { descriValidation ? <span className="text-[16px] text-red-400"> Description Required </span> : <span className="text-gray-500 ">
              Include any specific comments on what should be improved, added,
              etc.
            </span> }
            <textarea
              value={newPost.description}
              onChange={(e)=> {setNewPost({...newPost , description:e.target.value}) ; setDescriValidation(false)}}
              name="description"
              id=""
              cols="10"
              rows="10"
              className="normal-case shadow-sm shadow-gray-200 resize-none p-4 mt-3 cursor-pointer text-[16px] focus:outline-0  text-blue-600 h-[100px] rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400 "
            ></textarea>
          </div>

          <div className="flex w-full gap-6 justify-end ">
          { id &&  <button type="button" onClick={deletefeedback} className=" md:text-[14px] p-3 text-[18px] font-bold text-white border mr-auto rounded-lg bg-red-600 ">
              Delete
            </button> }
            <Link type="button" to= { id ? `/request/${feedback.id}` : "/" } className=" md:text-[14px]  p-3 text-[18px] font-bold text-white border rounded-lg bg-[#363E68] ">
              Cancel
            </Link>
            <button type="submit" className="md:text-[14px] p-3 text-[18px] font-bold text-white border rounded-lg bg-[#AC1EEA]">
              { id ? "Save Changes":"Add Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addfeedback;