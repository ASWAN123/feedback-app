import React, { useContext, useState } from "react" ;
import { CiLight } from "react-icons/ci" ;
import { MdOutlineArrowDropDown } from "react-icons/md" ;
import { Link } from "react-router-dom";
import { Userdata } from "./context/Contextfuncs";


function Header() {
  let [drop, setDrop] = useState(false);
  let { data , posts , setPosts } = useContext(Userdata)

  

  const handMenu = () => {
    setDrop(!drop);
  };

  const filterComments = (e)=> {
    let x = e.target.textContent ;
    setDrop(!drop)

    switch(x){

      case 'Most upvotes':
        setPosts(JSON.parse(data)['productRequests'].sort((a , b)=> b.upvotes - a.upvotes))
        break

      case 'Latest Upvotes' :
        setPosts(JSON.parse(data)['productRequests'].sort((a , b)=> a.upvotes - b.upvotes))
        break
      
      case 'Most Comments' :
        setPosts(JSON.parse(data)['productRequests'].sort((a , b)=> b.comments.length - a.comments.length))
        break
      
      case 'Latest Comments' :
        setPosts(JSON.parse(data)['productRequests'].sort((a , b)=> a.comments.length - b.comments.length))
        break

    }
  }


  return (
    <div className="header shadow-md relative flex  bg-[#3A4272] text-white  items-center w-full min-h-[80px] rounded-lg ">
      <div className="menubar flex mx-2 ">
        <div className="flex items-center gap-6 ">
          <CiLight size={30} /> <p className=" font-bold md:text-[1.5rem]">{posts.length} Suggestions</p>
        </div>
        <div className="flex mx-8 items-center ">
          <div className="flex gap-2 items-center ">
            <span>Sort by :</span>{" "}
            <div className=" cursor-pointer" onClick={handMenu}>
              Most updates
            </div>
            <MdOutlineArrowDropDown
              size={20}
              style={drop ? { transform: "rotate(180deg)" } : ""}
            />
          </div>

          <div
            className={`dropdown-menu w-[250px]  text-black bg-white flex flex-col rounded-lg mt-[17rem] shadow-2xl ${
              drop ? "absolute" : "hidden"
            } `}
          >
            <p onClick={(e)=> {filterComments(e)}} className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 ">Most upvotes</p>
            <p onClick={(e)=> {filterComments(e)}} className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 ">Latest Upvotes</p>
            <p onClick={(e)=> {filterComments(e)}} className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 ">Most Comments</p>
            <p onClick={(e)=> {filterComments(e)}} className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 ">Latest Comments</p>
          </div>
        </div>
      </div>
      <Link to = "/add-feedback" className="hover:opacity-75 px-3 py-2 rounded-lg  ml-auto mr-4 bg-purple-500 text-white text-[14px]">+Add Feedback</Link>
    </div>
  );
}

export default Header;
