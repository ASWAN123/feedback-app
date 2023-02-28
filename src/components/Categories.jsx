import React, { useContext, useEffect, useState } from "react";
import { Userdata } from "./context/Contextfuncs";

function Categories() {
  let {data , setData ,  posts  , setPosts } = useContext(Userdata);

  const getCateories = () => {
    let categories = Array.from(new Set(posts.map((req) => req["category"])));
    return categories;
  };

  let [category_list, setCategory_list] = useState(getCateories());

  const HandleFilter = (cat)=> {
    
    let newPosts ;
    if(cat === 'All'){
      newPosts= JSON.parse(data)['productRequests']
    }else{
      newPosts = JSON.parse(data)['productRequests'].filter((post)=> post.category === cat)
    }
    setPosts(newPosts)
  }

  return (
    <div className=" capitalize category shadow-md w-[250px] rounded-lg p-4 bg-white text-black ">
      <ul className="flex gap-4 flex-wrap bg-white">
        <li onClick={(e)=> {HandleFilter(e ,'All')}} className="py-1 px-2 rounded-lg bg-blue-400 text-white cursor-pointer hover:opacity-75 ">
          All
        </li>
        {category_list.map((cat, index) => {
          return (
            <li
              className="py-1 px-2 rounded-lg bg-gray-200 text-blue-600 cursor-pointer hover:opacity-75"
              key={index}
              onClick = {()=> {HandleFilter( cat )}}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
