import React, { useState } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Addfeedback = () => {
  let [drop, setDrop] = useState(false);

  const HandleDrop = ()=> {
    setDrop(!drop)
  }

  return (
    <div className="w-[70%] flex flex-col p-4  mx-auto gap-12 ">
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
          action="/"
          className="flex flex-col gap-8 p-4 relative "
        >
          <p className="font-bold text-[25px] mt-5 pl-2">Create New Feedback</p>

          <div className="group  flex flex-col p-1 gap-1 ">
            <label htmlFor="title" className="font-bold text-[18px] ">
              Feedback Title
            </label>
            <span className="text-gray-400 ">
              Add a short , descriptive healine
            </span>
            <input
              type="text"
              name="title"
              className=" shadow-sm shadow-gray-200 capitalize mt-3 text-[16px] text-blue-600 h-[50px] p-4 rounded-md bg-[#F7F9FC] focus:outline-0 focus:border-[1px] border-blue-400  "
            />
          </div>

          <div className="group flex flex-col p-1 gap-1 ">
            <label htmlFor="cat" className="font-bold text-[18px] ">
              Category
            </label>
            <span className="text-gray-400 ">
              Choose a category for your feedback
            </span>
            <div onClick={HandleDrop} className="shadow-sm shadow-gray-200 flex justify-between mt-3 cursor-pointer text-[16px] text-blue-600 h-[50px] p-4 pb-2 rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400 ">
              <button type ="button" className="w-full text-start">Feature</button>
              <MdOutlineArrowDropDown size={20} />
            </div>
            <div
              className={`dropdown-menu text-black  bg-white flex flex-col rounded-lg shadow-2xl w-[95%] mt-[130px] ${
                drop ? "absolute" : "hidden"
              } `}
            >
              <p className="cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2   border-b hover:text-purple-400 ">
                Feature
              </p>
              <p className="cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2    border-b hover:text-purple-400 ">
                Enhancement
              </p>
              <p className="cursor-pointer text-[16px] text-black h-[50px] p-4 pb-2   border-b hover:text-purple-400 ">
                Bug
              </p>
            </div>
          </div>

          <div className="group flex flex-col p-1 gap-1 ">
            <label htmlFor="" className="font-bold text-[18px] ">
              Feedback Detail
            </label>
            <span className="text-gray-500 ">
              Include any specific comments on what should be improved, added,
              etc.
            </span>
            <textarea
              name=""
              id=""
              cols="10"
              rows="10"
              className="shadow-sm shadow-gray-200 resize-none p-4 mt-3 cursor-pointer text-[16px] focus:outline-0  text-blue-600 h-[100px] rounded-md bg-[#F7F9FC] focus:border-[1px] border-blue-400 "
            ></textarea>
          </div>

          <div className="flex ml-auto gap-6 ">
            <button className="p-3 text-[18px] font-bold text-white border rounded-lg bg-[#363E68] ">
              Cancel
            </button>
            <button className="p-3 text-[18px] font-bold text-white border rounded-lg bg-[#AC1EEA]">
              Add feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addfeedback;
