import React, { useContext, useEffect, useState } from "react";
import { Userdata } from "./context/Contextfuncs";

function Categories() {
  let {data , setData ,  posts  , setPosts } = useContext(Userdata);

  const getCateories = (x) => {
    let categories = Array.from(new Set(x.map((req) => req["category"])));
    return categories;
  };

  let  y = getCateories(JSON.parse(data)['productRequests'])


  let [category_list, setCategory_list] = useState(y);

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
      <ul className="category-list flex gap-4 flex-wrap bg-white">
        <li onClick={()=> {HandleFilter('All')}} className={`py-1 px-2 rounded-lg ${ getCateories(posts).length > 1 ?  'bg-blue-400 text-white' : 'bg-gray-200 text-blue-600' } cursor-pointer hover:opacity-75 `}>
          All
        </li>
        {category_list.map((cat, index) => {
          return (
            <li
              className={`py-1 px-2 rounded-lg ${ ( getCateories(posts).length == 1 && getCateories(posts) == cat ) ?  'bg-blue-400 text-white' : 'bg-gray-200 text-blue-600' } text-blue-600 cursor-pointer hover:opacity-75`}
              key={index}
              onClick = {()=> {HandleFilter(cat)}}
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
