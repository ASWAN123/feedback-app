import React, { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";

function Header() {
  let [drop, setDrop] = useState(false);

  const handMenu = () => {
    setDrop(!drop);
  };

  return (
    <div className="header shadow-md relative flex  bg-gray-500 text-white  items-center w-full h-[50px] rounded-lg ">
      <div className="menubar flex mx-2 ">
        <div className="flex items-center gap-6 ">
          <CiLight size={30} /> <p className="font-bold">6 Suggestions</p>
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
            className={`dropdown-menu bg-gray-300 p-4 flex flex-col gap-2 rounded-lg mt-[15rem] ${
              drop ? "absolute" : "hidden"
            } `}
          >
            <p className="px-2 text-md cursor-pointer ">Most upvotes</p>
            <p className="px-2 text-md cursor-pointer ">Latest Upvotes</p>
            <p className="px-2 text-md cursor-pointer ">Most Comments</p>
            <p className="px-2 text-md cursor-pointer ">Latest Comments</p>
            <p></p>
          </div>
        </div>
      </div>
      <button className="border p-1 rounded-lg  ml-auto mr-1 bg-gray-200 text-black ">+Add Feedback</button>
    </div>
  );
}

export default Header;
