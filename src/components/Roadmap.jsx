


import { clear } from '@testing-library/user-event/dist/clear'
import React, { useContext, useState } from 'react'
import { Userdata } from './context/Contextfuncs'

function Roadmap() {
  let {posts} = useContext(Userdata)

  const getRoadmap = () =>{
    let roadmap =posts.map((req)=> req['status'] );
    return roadmap ;
  }

  let [roadmap_items , setRoadmap_items ]  = useState(getRoadmap()) ;
  let uniqueRoadmap = Array.from(new Set([...roadmap_items]))
  uniqueRoadmap.shift()
  

  return (
    <div className="capitalize roadmap w-[250px] rounded-lg px-2 py-5 bg-white text-white shadow-md ">
      <div className='flex justify-between text-black px-2 '>
        <h3 className='font-bold'>Roadmap</h3>
        <a className='underline text-blue-600 ' href="/">view</a>
      </div>
      <div className='flex flex-col gap-4 mt-4 text-black '>
        {
          uniqueRoadmap.map((rdm , index)=> {
            return <div key={index} className='flex justify-between px-2 '><p>{rdm}</p><span className='font-bold'>{roadmap_items.filter((x)=> x == rdm).length}</span></div>
          })
        }
        {/* <div className='flex justify-between px-2 '><p>Planed</p><span className='font-bold'>3</span></div>
        <div className='flex justify-between px-2 '><p>In-Progress</p><span className='font-bold'>2</span></div>
        <div className='flex justify-between px-2 '><p>Live</p><span className='font-bold'>1</span></div> */}
      </div>
    </div>
  )
}

export default Roadmap ;


