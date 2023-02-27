

import React from 'react'

function Categories() {
  return (
    <div className=" category shadow-md w-[250px] rounded-lg p-4 bg-white text-black ">
      <ul className='flex gap-4 flex-wrap bg-white '>
        <li className='py-1 px-2 rounded-lg bg-gray-200 text-white '>All</li>
        <li className='py-1 px-2 rounded-lg bg-gray-200 text-white '>UI</li>
        <li className='py-1 px-2 rounded-lg bg-gray-200 text-white '>UX</li>
        <li className='py-1 px-2 rounded-lg bg-gray-200 text-white '>Enhacement</li>
        <li className='py-1 px-2 rounded-lg bg-gray-200 text-white '>Bug</li>
        <li className='py-1 px-2 rounded-lg bg-gray-200 text-white '>Feature</li>
      </ul>
    </div>
  )
}

export default Categories