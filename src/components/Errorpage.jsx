import React from 'react'

function Errorpage() {
  return (
    <div className='m-auto mt-[20%] flex flex-col text-[20px] font-bold items-center text-center'>
        <span> "You seem lost. Did you forget your map? Try logging in to find your way back." </span>
        <a href="/" className='text-blue-400 underline text-[30px] cursor-pointer '>Home page</a>
    </div>
  )
}

export default Errorpage