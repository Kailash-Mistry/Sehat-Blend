import Hamburger from "../assets/hamburger.png"
import NavLogo from "../assets/logo-final-2.png"
import React, { useState, useEffect } from 'react'
import SearchLogo from "../assets/search.png"
import { CardList } from './HospitalCard';

export function Navbar({ setSearchQuery }){

    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(searchInput);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
      setShowMenu(!showMenu);
    }

    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen width is less than 768 pixels (typical mobile breakpoint)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 637);
    };

    // Add event listener to check screen size when the component mounts
    window.addEventListener('resize', checkScreenSize);

    // Call checkScreenSize initially to set the initial state
    checkScreenSize();

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);


    return(
        <>
            <div className="nav-bar w-full flex flex-row justify-between z-10  h-16 sticky bg-sky-300 pl-12">
                <div>
                    <img className="h-[100%] -mt-1 -ml-5 sm:-ml-0" src={NavLogo} alt="" />
                </div>
                <div className="">
                    <h2 className="text-black hidden xl:block text-3xl pt-3 pl-8 font-bold">Sehat Blend</h2>
                </div>
                <div className="flex">
                    <input
                        type="text"
                        placeholder={isMobile ? 'Search hospitals' : 'Search hospitals near you'}
                        className="mt-4 h-8 sm:w-80 w-48 rounded-2xl pl-6"
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch} className="h-6 mt-5 relative right-8"><img src={SearchLogo} alt="" className="h-full" /></button>
                </div>
                <div className="flex flex-row gap-3 mx-4">
                    <button className="hidden text-black lg:block hover:font-semibold active:font-semibold m-2 px-4 py-1 h-11 rounded-md   text-sm sm:text-base">Home</button>
                    <button className="hidden text-black lg:block hover:font-semibold active:font-semibold m-2 px-4 py-1 h-11 rounded-md   text-sm sm:text-base">About us</button>
                    <button className="hidden text-black lg:block hover:font-semibold active:font-semibold m-2 px-4 py-1 h-11 rounded-md   text-sm sm:text-base">Login</button>
                    <button className="text-black hidden lg:block hover:font-semibold active:font-semibold m-2 px-4 py-1 h-11 rounded-md text-sm sm:text-base">Sign-Up</button>
                    <div className='lg:hidden '><button onClick={handleClick} className='text-white rounded-[50%]'><img className='h-[36px] w-[36px] mt-3' src={Hamburger} alt="" /></button></div>
                </div>
            </div>
            {showMenu && (
    
            <div className='flex bg-purple-800 justify-center items-center h-[90vh] w-[100vw] md:hidden'>
                <div className='flex flex-col gap-8 text-center'>
                    <div><a href=""  className='font-semibold hover:scale-110'>Home</a></div>
                    <div><a href="" className='font-semibold hover:scale-110'>For Teachers</a></div>
                    <div><a href="" className='font-semibold hover:scale-110'>For Students</a></div>
                    <div><button><a href="" className='border-[1px] border-black p-2 rounded-lg font-bold'>SignUp</a></button></div>
                </div>
            
            </div>
                )}
        </>
    )
}