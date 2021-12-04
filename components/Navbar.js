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
        className="fixed hidden md:block left-0 top-0 bg-gray-100 w-60 md:w-96 md:h-screen border-r-2 flex flex-col transition-all"
        style={{
            width: Close ? "6rem" : null
        }}
    >
      <button 
        className="fixed top-24 left-60 md:left-96 -ml-5 transition-all"
        onClick = {() => ChangeClose()}
        style={{
            transform: Close ? "rotate(180deg)" : null,
            left: Close ? "6rem" : null
        }}
      >
        <img className="w-12" src="/assets/Navbar/Back.svg" />
      </button>
      <img 
        className="w-28 md:w-44 pl-10 pt-5 transition-all" 
        src="/assets/CampusCircle.svg" 
        style={{
            paddingLeft: Close ? "1rem" : null,
            width: Close ? "5rem" : null
         }}
      />
      <h2 className="font-body tracking-tighter pl-10 pt-5 text-2xl text-primary font-medium transition-all"
        style={{
            display: Close? "none" : null
        }}
      >
        FET Jamia Millia Islamia
      </h2>

      <ul className="flex-grow">
        {TopNav.map((item, index) => {
          return (
            <Link href={item.link}>
            <li 
            className="flex p-3 m-4 my-6 font-body text-primary rounded-md cursor-pointer hover:bg-white hover:bg-opacity-40 border-2 border-transparent transition-all"
            style={{
              backgroundColor: (router.pathname == item.link) ? 'white' : null
            }}
            >
              <img className="w-7" src={item.src} />
              <div 
                className="self-center text-2xl font-semibold pl-4 transition-all"
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
          <img className="w-7" src="/assets/Navbar/Phone.svg" />
          <div className="self-center text-2xl font-semibold pl-4"
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
