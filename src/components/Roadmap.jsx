


import React from 'react'

function Roadmap() {
  return (
    <div className="roadmap w-[250px] rounded-lg px-2 py-5 bg-white text-white shadow-md ">
      <div className='flex justify-between text-black px-2 '>
        <h3 className='font-bold'>Roadmap</h3>
        <a className='underline text-blue' href="/">view</a>
      </div>
      <div className='flex flex-col gap-4 mt-4 text-black '>
        <div className='flex justify-between px-2 '><p>Planed</p><span>3</span></div>
        <div className='flex justify-between px-2 '><p>In-Progress</p><span>2</span></div>
        <div className='flex justify-between px-2 '><p>Live</p><span>1</span></div>
      </div>
    </div>
  )
}

export default Roadmap ;


