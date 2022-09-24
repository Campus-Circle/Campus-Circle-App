import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { BiDoorOpen, BiLogIn } from "react-icons/bi";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHome, AiFillBook, AiFillAndroid } from "react-icons/ai";
import { FaBook, FaStickyNote, FaRegNewspaper } from "react-icons/fa";
import { TiArrowSortedUp } from "react-icons/ti";
import { useMediaQuery } from "react-responsive";
function Navbar({ Close, setClose }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const TopNav = [
    {
      id: 1,
      name: "Home",
      icon: AiFillHome,
      link: "/",
    },
    {
      id: 2,
      name: "Course",
      icon: AiFillBook,
      link: "/course",
    },
    {
      id: 3,
      name: "Placements",
      icon: FaBook,
      link: "/placements",
    },
    {
      id: 4,
      name: "Notes",
      icon: FaStickyNote,
      link: "/notes",
    },
    {
      id: 5,
      name: "PYQs",
      icon: FaRegNewspaper,
      link: "/pyqs",
    },
  ];

  const Socials = [
    {
      name: "Github",
      link: "https://github.com/Campus-Circle",
      src: "/assets/Socials/GitHub.svg",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/cc_campuscircle/",
      src: "/assets/Socials/Instagram.svg",
    },
  ];

  function ChangeClose() {
    setClose(!Close);
  }

  return (
    <React.Fragment>
      <motion.div
        className="font-body h-screen fixed  flex-col pt-10 items-center shadow-2xl rounded-r-md shadow-primary/50 dark:shadow-slate-900  dark:bg-slate-700 bg-gradient-to-b from-primary to-blue-500"
        animate={{
          width: Close ? "6rem" : "16rem",
          display: isDesktopOrLaptop ? "flex" : "none",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <img src={"assets/CampusCircle.svg"} className="w-14" />
        </div>
        <div className="flex-grow flex flex-col items-end gap-3 w-full my-4">
          {TopNav.map((item, index) => {
            return (
              <Link key={item.id} href={item.link}>
                <motion.div
                  className={`flex items-center gap-5  w-11/12 p-3 px-5 rounded-l-md 
                  
                ${
                  router.pathname !== item.link
                    ? "text-white"
                    : "text-primary bg-white dark:bg-primary dark:text-white"
                }
                     transition-all cursor-pointer
                ${Close ? "justify-center items-center" : ""}
                `}
                >
                  <item.icon className="w-6 h-6 " />
                  <span
                    style={{
                      display: Close ? "none" : "block",
                    }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}

          <a
            href={`${process.env.NEXT_PUBLIC_URL}/files/CampusCircle.apk`}
            className=" m-5 p-4 text-white flex gap-2 border-2 hover:bg-white hover:text-primary border-white rounded-md transition-all"
          >
            <AiFillAndroid className="self-center" />
            <p className="text-sm">Android App is Here!</p>
          </a>
        </div>
        <div className="flex justify-end px-5 py-2 items-end w-full">
          <motion.button
            animate={{
              rotate: Close ? "-90deg" : "90deg",
            }}
            onClick={ChangeClose}
            className=""
          >
            <TiArrowSortedUp
              className="
              
            m-1 p-1 text-white
            w-10 h-10 rounded-sm"
            />
          </motion.button>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default Navbar;
