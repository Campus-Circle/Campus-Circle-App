import React, { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { MdDoubleArrow } from "react-icons/md";

import {useSelector} from "react-redux"

function Navbar({ Close, setClose }) {
  const router = useRouter();

  const [Open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!Open);
  };

  const auth = useSelector(state => state.auth);

  const TopNav = [
    {
      id: 1,
      name: "Home",
      src: "/assets/Navbar/Home.svg",
      link: "/",
    },
    {
      id: 2,
      name: "Course",
      src: "/assets/Navbar/Course.svg",
      link: "/course",
    },
    {
      id: 3,
      name: "Placements",
      src: "/assets/Navbar/Placements.svg",
      link: "/placements",
    },
    {
      id: 4,
      name: "Events",
      src: "/assets/Navbar/Events.svg",
      link: "/events",
    },
    {
      id: 5,
      name: "Notes",
      src: "/assets/Navbar/Notes.svg",
      link: "/notes",
    },
    {
      id: 6,
      name: "Feed",
      src: "/assets/Navbar/Annotation.svg",
      link: "/feed/hot",
    },
    {
      id: 7,
      name: "Students List",
      src: "/assets/Navbar/ClipboardList.svg",
      link: "/student",
    },
  ];

  return (
    <div className="flex md:hidden fixed transition-all"
      style={{
        transform: Open? "translateX(0)" : "translateX(-80%)",
      }}
    >
      <div className="bg-gray-100/80 px-8 backdrop-blur-sm h-screen font-body">
        {TopNav.map((item, index) => {
          return (
            <Link key={item.name} href={item.link}>
              <a onClick={handleClick}>
              <div
                className="flex my-3 py-3 border-b px-3 border-primary/20 rounded-md"
                style={{
                  backgroundColor:
                    router.pathname == item.link ? "rgb(152 194 217 / 20%)" : null,
                }}
              >
                <img className="w-7" src={item.src} />
                <p className="mx-3 text-primary font-semibold self-center">{item.name}</p>
              </div>
              </a>
            </Link>
          );
        })}

        <div>

        </div>
      </div>

      <div className="bg-gray-50 shadow-lg shadow-primary/20 rounded-r-full h-14 flex">
        <MdDoubleArrow
          className="text-3xl text-primary m-3 transition-all self-center"
          style={{
            transform: Open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          onClick={handleClick}
        />
      </div>

      

    </div>
  );
}

export default Navbar;
