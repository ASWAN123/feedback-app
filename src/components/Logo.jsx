import React, { useContext, useState } from 'react'
import {BiMenu} from "react-icons/bi" ;
import {GrClose} from "react-icons/gr" ;
import { Userdata } from './context/Contextfuncs';

function Logo() {
    let [open , setOpen ] = useState(false)


    const showmenu = ()=> {
        document.querySelector('.sidebarmenu').classList.remove('md:right-[-1000px]')
        document.querySelector('.sidebarmenu').classList.add('md:right-0')
        document.querySelector('.signbutton').classList.replace('md:invisible' , 'md:visible')
    }

    const hidemenu =()=> {
        document.querySelector('.sidebarmenu').classList.remove('md:right-0')
        document.querySelector('.sidebarmenu').classList.add('md:right-[-1000px]')
        document.querySelector('.signbutton').classList.replace('md:visible' , 'md:invisible')
    }

    return (
        <div className=" shadow-md px-4 pt-8 flex justify-center lg:text-[1.5rem] xl:h-[180px] xl:text-[2rem] xl:min-w-[30%] xl:max-w-[30%] w-[250px] h-[120px] text-white bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg md:fixed md:top-0 md:left-0 md:rounded-none md:min-w-full md:max-h-[60px]  md:text-[14px]  md:p-0 md:px-2 md:justify-between  md:items-center ">
            <div><p className='font-bold '>Frontend Mentor</p>
            <span>Feedback App</span>
            </div> 
            <button className=' md:visible invisible '>
            { !open &&  <BiMenu size={30} onClick={()=> {setOpen(true) ; showmenu()      }} className=" cursor-pointer "/> }
            { open  &&  <GrClose size={20}  onClick={()=> {setOpen(false) ; hidemenu()   }}  className="  cursor-pointer  "/>  }
            </button>
        </div>
    )
}

export default Logo ;
