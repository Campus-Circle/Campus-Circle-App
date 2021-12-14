import React, { useState } from "react";
import { useRouter } from 'next/router'

import Link from 'next/link'

function Navbar({Close,setClose}) {

  const router = useRouter();

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
    }
  ];

  const Socials = [
    {
      link:"https://github.com/Campus-Circle",
      src: "/assets/Socials/GitHub.svg",
    },
    {
      link:"https://www.instagram.com/jmicampuscircle/",
      src: "/assets/Socials/Instagram.svg",
    },

  ];

  function ChangeClose() {
    setClose(!Close);
  }



  return (
    <div 
        className="fixed md:block left-0 top-0 bg-gray-100 w-60 md:w-64 md:h-screen border-r-2 flex flex-col transition-all"
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
        }}
      >
        <img className="w-12" src="/assets/Navbar/Back.svg" />
      </button>
      <img 
        className="w-28 md:w-36 pl-10 pt-5 transition-all" 
        src="/assets/CampusCircle.svg" 
        style={{
            paddingLeft: Close ? "1rem" : null,
            width: Close ? "5rem" : null
         }}
      />

      <ul className="flex-grow">
        {TopNav.map((item, index) => {
          return (
            <Link href={item.link}>
            <li 
            className="flex p-3 m-4 my-2 font-body text-primary rounded-md cursor-pointer hover:bg-white hover:bg-opacity-40 border-2 border-transparent transition-all"
            style={{
              backgroundColor: (router.pathname == item.link) ? 'white' : null,
            }}
            >
              <img className="w-5" src={item.src} />
              <div 
                className="self-center text-xl font-medium pl-4 transition-all"
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

      <ul>
        <Link href="/contact">
        <li className="flex p-3 m-4 my-6 mb-4 font-body text-primary rounded-md cursor-pointer hover:bg-white hover:bg-opacity-40 border-2 border-transparent"
          style={{
            backgroundColor: (router.pathname == "/contact") ? 'white' : null
          }}
        >
          <img className="w-5" src="/assets/Navbar/Phone.svg" />
          <div className="self-center text-xl font-medium pl-4"
          style={{
              display: Close ? "none" : null
          }}>
            Contact Us
          </div>
        </li>
        </Link>
      </ul>
      <div class="flex p-3 m-4 mt-0 font-body bg-white rounded-lg transition-all">
        <ul className="flex" 
            style={{
                flexDirection : Close ? "column" : null
            }}
        >
          {Socials.map((item, index) => {
            return (
              <Link href={item.link}>
              <li className="transition-all" style={{
                  paddingTop : Close ? "0.5rem" : null
              }}>
                <img className="w-16 mr-3" src={item.src} />
              </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
