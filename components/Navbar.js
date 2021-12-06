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
      name: "Contact Us",
      src: "/assets/Navbar/Phone.svg",
      link: '/contact'
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
        style={{ width: Close ? "6rem" : null }}>
      <button 
        className="fixed top-24 left-60 md:left-96 -ml-5 transition-all"
        onClick = {() => ChangeClose()}
        style={{
            transform: Close ? "rotate(180deg)" : null,
            left: Close ? "6rem" : null
        }}>
        <img className="w-12" src="/assets/Navbar/Back.svg" />
      </button>
      <img 
        className="w-28 md:w-44 pl-10 pt-5 transition-all" 
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
              className="flex p-3 m-4 my-6 font-body text-primary rounded-md cursor-pointer hover:bg-white hover:bg-opacity-40 border-2 border-transparent transition-all"
              style={{
                backgroundColor: (router.pathname == item.link) ? 'white' : null
              }}>
                <img alt={item.name} className="w-7" src={item.src} />
                <div
                  className="self-center text-2xl font-semibold pl-4 transition-all"
                  style={{
                      display: Close ? "none" : null,
                  }}>
                  {item.name}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>

      <div className="flex p-3 m-4 mt-0 font-body bg-white rounded-lg transition-all">
        <ul className="flex" 
            style={{ flexDirection : Close ? "column" : null }}>
          {Socials.map((item, index) => {
            return (
              <Link key={item.link} href={item.link}>
                <li className="transition-all" style={{
                    paddingTop : Close ? "0.5rem" : null
                }}>
                  <img alt={item.name} className="w-16 mr-3" src={item.src} />
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
