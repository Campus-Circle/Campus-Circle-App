import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import Link from 'next/link'
import {BiDoorOpen,BiLogIn} from 'react-icons/bi'
import {useSelector, useDispatch} from 'react-redux'

function Navbar({Close,setClose}) {

  const router = useRouter();

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const TopNav = [
    {
      id: 1,
      name: "Home",
      src: "/assets/Navbar/Home.svg",
      link: '/'
    },
    {
      id: 2,
      name: "Course",
      src: "/assets/Navbar/Course.svg",
      link: '/course'
    },
    {
      id: 3,
      name: "Placements",
      src: "/assets/Navbar/Placements.svg",
      link: '/placements'
    },
    {
      id: 4,
      name: "Events",
      src: "/assets/Navbar/Events.svg",
      link: '/events'
    },
    {
      id: 5,
      name: "Notes",
      src: "/assets/Navbar/Notes.svg",
      link: '/notes'
    },
    {
      id: 6,
      name: "Q/A",
      src: "/assets/Navbar/Annotation.svg",
      link: '/feed/hot'
    },
    {
      id: 7,
      name: "Students List",
      src: "/assets/Navbar/ClipboardList.svg",
      link: '/student'
    }
  ];

  const Socials = [
    {
      name: "Github",
      link:"https://github.com/Campus-Circle",
      src: "/assets/Socials/GitHub.svg",
    },
    {
      name: "Instagram",
      link:"https://www.instagram.com/cc_campuscircle/",
      src: "/assets/Socials/Instagram.svg",
    },
  ];

  function ChangeClose() {
    setClose(!Close);
  }

  useEffect(() => {
    
  }, [])


  return (
    <div 
        className="fixed hidden md:block left-0 top-0 bg-gray-100 w-60 md:w-64 md:h-screen border-r-2  flex-col transition-all"
        style={{
            width: Close ? "6rem" : null
        }}
    >
      <button 
        className="fixed top-24 md:w-8 left-60 md:left-64 -ml-4 transition-all"
        onClick = {() => ChangeClose()}
        style={{
            transform: Close ? "rotate(180deg)" : null,
            left: Close ? "6rem" : null
        }}>
        <img className="w-12" src="/assets/Navbar/Back.svg" />
      </button>
      <img 
        className="w-28 md:w-36 pl-10 pt-5 transition-all" 
        src="/assets/CampusCircle.svg" 
        style={{
            paddingLeft: Close ? "1rem" : null,
            width: Close ? "5rem" : null
         }}/>

      <ul className="flex-grow">
        {TopNav.map((item, index) => {
          return (
            <Link key={item.id} href={item.link}>
            <li 
            className="flex p-2 m-4 my-1 font-body text-primary rounded-md cursor-pointer hover:bg-white hover:bg-opacity-40 border-2 border-transparent transition-all shadow-md shadow-primary/20"
            style={{
              backgroundColor: (router.pathname == item.link) ? 'white' : null,
              boxShadow: (router.pathname == item.link) ? null : 'none',
              justifyContent: Close ? "center" : null
            }}
            >
              <img className="w-4" src={item.src} />
              <div 
                className="self-center text-lg font-medium pl-4 transition-all"
                style={{
                    display: Close ? "none" : null,
                }}
              >
                {item.name}
              </div>
            </li>
            </Link>
          );
        })}
      </ul>

      <div className="flex p-3 m-4 mt-0 font-body bg-white rounded-lg transition-all shadow-md shadow-gray/10">
        <ul className="flex" 
            style={{ flexDirection : Close ? "column" : null }}>
          {Socials.map((item, index) => {
            return (
              <Link key={item.link} href={item.link}>
                <li className="transition-all" style={{
                    paddingTop : Close ? "0.5rem" : null
                }}>
                  <img alt={item.name} className="w-12 mr-3" src={item.src} />
                </li>
              </Link>
            );
          })}
        </ul>
        
      </div>

      {
        auth.token !== '' ?
        <button className="flex font-body font-semibold px-4 py-2 bg-primary/70 ml-6 rounded-lg text-white hover:bg-primary transition-all" onClick={() => {
        localStorage.removeItem('CampusAuth');
        window.location.href = '/';
      }}>
          <BiDoorOpen className="self-center" />
          <span className="pl-1">{Close ? "" : "Logout"}</span>
      </button> : 
      <Link href="/auth/login">
        <button className="flex font-body font-semibold px-4 py-2 bg-primary/70 ml-6 rounded-lg text-white hover:bg-primary transition-all">
          <BiLogIn className="self-center" />
          <span className="pl-1">{Close? "" : "Login"}</span>
        </button>
      </Link>
      }
    </div>
  );
}

export default Navbar;
