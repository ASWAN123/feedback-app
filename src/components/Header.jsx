import React, { useContext, useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { Userdata } from "./context/Contextfuncs";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Header() {
  let [drop, setDrop] = useState(false);
  let { data, posts, setPosts, setData , open , setOpen } = useContext(Userdata);
  let curentUser = JSON.parse(data)["currentUser"].username;

  const notifylogin = () => toast.success("You have been logged in successfully")  ;
  const notifylogout = () => toast('Thank you for visiting my App', {
    icon: '👏',
  });      ;

  const handMenu = () => {
    setDrop(!drop);
  };

  const filterComments = (e) => {
    let x = e.target.textContent;
    setDrop(!drop);

    let filtredposts;

    switch (x) {
      case "Most upvotes":
        setPosts([...posts].sort((a, b) => b.upvotes - a.upvotes));
        break;

      case "Latest Upvotes":
        setPosts([...posts].sort((a, b) => a.upvotes - b.upvotes));
        break;

      case "Most Comments":
        setPosts(
          [...posts].sort((a, b) => b.comments.length - a.comments.length)
        );
        break;

      case "Latest Comments":
        setPosts(
          [...posts].sort((a, b) => a.comments.length - b.comments.length)
        );
        break;
    }
  };

  // useEffect(()=>(
  //   setPosts(posts)
  // ) , [posts] )

  const handleLogout = () => {
    let newdata = JSON.parse(data);
    newdata["currentUser"] = {};
    setData(JSON.stringify(newdata));
  };

  const handlelogin = (user) => {
    let { picture, name, given_name } = user;
    let newdata = JSON.parse(data);
    newdata["currentUser"] = {
      image: picture,
      name: name,
      username: given_name,
    };
    setData(JSON.stringify(newdata));
  };

  return (
    <div className="header md:min-h-[60px] shadow-md relative flex  bg-[#312e81] text-white  items-center w-full min-h-[80px] rounded-lg md:fixed md:left-0 md:rounded-none md:top-14 sm:max-w-full ">
       <Toaster />
      <div className="menubar flex mx-2 sm:mx-0 ">
        <div className="flex items-center gap-6 sm:hidden">
          <CiLight size={30} className="" />{" "}
          <p className="  font-bold md:text-[1rem] text-center sm:text-[12px] ">
            {posts.length} Suggestions
          </p>
        </div>
        <div className="flex mx-8 sm:mx-1 items-center ">
          <div className="flex gap-2 items-center md:text-[14px] ">
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
            <p
              onClick={(e) => {
                filterComments(e);
              }}
              className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 "
            >
              Most upvotes
            </p>
            <p
              onClick={(e) => {
                filterComments(e);
              }}
              className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 "
            >
              Latest Upvotes
            </p>
            <p
              onClick={(e) => {
                filterComments(e);
              }}
              className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 "
            >
              Most Comments
            </p>
            <p
              onClick={(e) => {
                filterComments(e);
              }}
              className="px-4 text-md cursor-pointer w-full py-3 border-b hover:text-purple-400 "
            >
              Latest Comments
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center  gap-2 ml-auto mr-4 p-2 md:mr-1  ">
        {curentUser && (
          <Link
            to="/add-feedback"
            className=" hover:opacity-75 py-[0.6rem] px-[5px] rounded-md mr-4 md:mr-0 md:px-2 md:py-2 bg-purple-500 text-center text-white text-[14px] sm:text-[14px] font-bold"
          >
            +Add Feedback
          </Link>
        )}
        {curentUser ? (
          <div
            onClick={(e) => {
              handleLogout() ;
              if( open ){
              setTimeout(() => {
                document.querySelector('.signbutton').classList.replace('md:invisible' , 'md:visible')
              }, 1000 );
              }
              notifylogout()
            }}
            className=" signbutton logout md:fixed md:right-[50px] md:invisible md:bottom-5 md:min-w-[200px]  cursor-pointer rounded-lg px-[2px] flex gap-2 bg-white items-center justify-center"
          >
            <img
              src="./assets/user-images/google.jpg"
              className=" rounded-full h-[30px] w-[30px]"
              alt=""
            />
            <button className="hover:opacity-75 py-[0.6rem] px-[5px] rounded-md  mr-4 bg-white text-center text-black text-[14px] font-bold">
              Log out
            </button>
          </div>
        ) : (
          <div className="md:fixed md:right-[50px] md:invisible md:bottom-5 md:min-w-[200px] signbutton login">
            <GoogleLogin
              onSuccess={(response) => {
                handlelogin(jwt_decode(response.credential));
                if( open ){
                  setTimeout(() => {
                    document.querySelector('.signbutton').classList.replace('md:invisible' , 'md:visible')
                  }, 1000 );
                  }
                notifylogin()
              }}
              onError={() => {
                console.log("Login failed");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
