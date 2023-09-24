"use client"
import React, { useState, useContext } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { CommonContext } from '@/providers/contextProvider';

const Navbar = () => {
    const { isUserLoggedIn } = useContext(CommonContext);
    let Links = [
        { name: "Home", link: "#hero" },
        { name: "Services", link: "#about" },
        { name: "Contact", link: "#contact" },
    ];
    let [open, setOpen] = useState(false);
    return (
        <div className=''>
            <div className='md:flex items-center justify-between 2xl:py-4 md:px-10 px-7 py-[10px] shadow-xl z-10 bg-white fixed w-full'>
                <div className='font-bold text-3xl flex items-center'>
                    <span className='text-[#D47C42]'>Legal</span><span className='text-primary-navy'>Connect</span>
                </div>
                <ul
                    className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-transparent md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-[55px]" : "top-[-490px]"
                        }`}
                >
                    {Links.map((link) => (
                        <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                            <a
                                href={link.link}
                                className="font-semibold text-primary-navy duration-500"
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-3 cursor-pointer lg:hidden sm:block text-black'>
                    {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
                </div>

                {open && (
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute bg-white md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-[55px]' : 'top-[-490px]'}`}>
                        {
                            Links.map((link) => (
                                <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                    <a href={link.link} className='font-semibold text-primary-navy hover:text-[#7f6abe] duration-500' onClick={() => setOpen(false)}>{link.name}</a>
                                </li>
                            ))
                        }
                        {!isUserLoggedIn && (<a href="Your link to mail"><button className='font-semibold p-2 mr-[-6px] rounded-xl duration-500 bg-primary-navy text-white text-xl md:ml-7' onClick={() => setOpen(false)}>Get Started</button></a>)}
                        {isUserLoggedIn && (
                            <button className='font-semibold p-2 mr-[-6px] bg-primary-navy rounded-xl text-white text-xl md:ml-7 hover:shadow-xl'>Log out</button>
                        )}
                    </ul>
                )}

                {!isUserLoggedIn && (<div className='hidden md:block'>
                    <button className='font-semibold p-2 mr-[-6px] bg-primary-lightGray rounded-xl text-primary-navy text-xl md:ml-7 hover:shadow-xl'>Sign in</button>
                    <button className='font-semibold p-2 mr-[-6px] bg-primary-navy rounded-xl text-white text-xl md:ml-7 hover:shadow-xl'>Get Started</button>
                </div>
                )}
                {isUserLoggedIn && (
                    <button className='hidden md:block font-semibold p-2 mr-[-6px] bg-primary-navy rounded-xl text-white text-xl md:ml-7 hover:shadow-xl'>Log out</button>
                )}
            </div>
        </div >
    )
}

export default Navbar