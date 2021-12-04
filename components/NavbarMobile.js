import React, { useState } from "react";
import { useRouter } from 'next/router'

import Link from 'next/link'

function Navbar({Close,setClose}) {

    const router = useRouter();

    const TopNav = [
      {
        id: 1,
        name: "Home",
        src: "/assets/NavbarMobile/Home_White.svg",
        link: '/'
      },
      {
        id: 2,
        name: "Course",
        src: "/assets/NavbarMobile/Course_White.svg",
        link: '/course'
      },
      {
        id: 3,
        name: "Placements",
        src: "/assets/NavbarMobile/Placements_White.svg",
        link: '/placements'
      },
      {
        id: 4,
        name: "Events",
        src: "/assets/NavbarMobile/Events_White.svg",
        link: '/events'
      },
      {
        id: 5,
        name: "Contact Us",
        src: "/assets/NavbarMobile/ContactUs_White.svg",
        link: '/contact'
      }
    ];

    return (
        <div className="flex md:hidden fixed w-screen bg-primary shadow-lg">
                {TopNav.map((item,index) => {
                    return (
                      <Link href={item.link}>
                        <div className="w-1/5 flex justify-center items-center py-3 transition-all"
                          style={{
                            backgroundColor: (router.pathname == item.link) ? "#0077b550" : null
                          }}
                        >
                            <img src={item.src}/>
                        </div>
                        </Link>
                    )
                })}

        </div>
    )
}

export default Navbar;
