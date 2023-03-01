import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { Userdata } from "../context/Contextfuncs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";

function Roadmaplist() {
  let { data } = useContext(Userdata);

  let filteredPosts = JSON.parse(data)["productRequests"].filter(
    (post) => post.status !== "suggestion"
  );

  let Arrayofroadmap = Array.from(
    new Set(filteredPosts.map((req) => req["status"]))
  );

  let uniqueitems = Arrayofroadmap.map(( rdm ) => {
    let newobj = { name: rdm };
    switch (rdm) {
      case "planned":
        newobj["descrption"] = "Ideas prioritized for research";
        newobj["color"] = "border-[#F59F87]" ;
        break;
      case "in-progress":
        newobj["descrption"] = "Currently being developed";
        newobj["color"] = "border-[#AD1FEA]" ;
        break;
      case "live":
        newobj["descrption"] = "Released features";
        newobj["color"] = "border-[#61BDFA]" ;
        break;
    }
    return newobj;
  });

  console.log(uniqueitems);

  return (
    <div className="Roadmaplist w-full flex flex-col gap-4 ">
      <div className="shadow-md flex  bg-[#3A4272] text-white  items-center w-full h-[80px] rounded-lg ">
        <div className="flex flex-col ml-4 mt-2 gap-2 ">
          <Link to="/" className="flex gap-1 font-bold ">
            <BsArrowBarLeft size={20} style={{ transform: "rotate(360deg)" }} />
            Go Back
          </Link>
          <h2 className="text-[25px] font-bold ">Roadmap</h2>
        </div>
        <Link to = "/add-feedback" className="hover:opacity-75 px-3 py-2 rounded-lg  ml-auto mr-4 bg-purple-500 text-white text-[14px]">+Add Feedback</Link>
      </div>

      <div className="columns capitalize flex gap-8 p-4">
        {uniqueitems.map((unique, index) => {
          return (
            <div key={index} className="column w-full flex flex-col gap-1 ">
              <h3 className="text-[1.5rem] tracking-wide">
                {unique.name}(
                {
                  filteredPosts.filter((post) => post.status == unique.name)
                    .length
                }
                )
              </h3>
              <p className="p-1">{unique.descrption}</p>
              <div className="cards flex flex-col gap-4 ">
                {filteredPosts
                  .filter((post) => post.status == unique.name)
                  .map((feedback) => {
                    return (
                      
                      <div key={feedback.id} className={`card border-t-4 ${unique.color} flex flex-col gap-1 rounded-lg shadow-md bg-white p-4`} >
                            <div className="flex "> <BsDot size={30} style={{'color':unique.color.replace('border-[','').replace(']','')}}/> <h3 className=""> {feedback.status}</h3></div>

                            <div className='details p-2'>
                              <h3 className='font-bold text-[16px] cursor-pointer hover:text-purple-400'>{feedback.title}</h3>
                              <p className=''>{feedback.description}</p>
                              <button className='m-1 px-3 py-1 rounded-lg bg-gray-200 text-blue-600 cursor-pointer hover:opacity-75 capitalize'>{feedback.category}</button>
                            </div>
                            <div className="flex p-3 ">
                              <div className={`${ feedback.upvoted ? 'bg-blue-400':'bg-gray-200' } cursor-pointer flex gap-3 rating py-1 px-3 items-center  rounded-lg `}>< MdOutlineArrowDropDown style={{'transform':'rotate(180deg)' , 'color':"blue"}}/><span>{feedback.upvotes}</span></div>
                              <div className='replies ml-auto mr-[5px] flex items-center gap-4 font-bold ' >
                                < FaCommentAlt style={{color:"lightgray"}}/>
                                <span>{feedback.comments.length}</span>
                              </div>
                            </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Roadmaplist;
