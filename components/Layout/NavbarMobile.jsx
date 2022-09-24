import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

function Navbar({ Close, setClose }) {
  const router = useRouter();

  const [Open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!Open);
  };

  const auth = useSelector((state) => state.auth);

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
      id: 5,
      name: "Notes",
      src: "/assets/Navbar/Notes.svg",
      link: "/notes",
    },
    {
      id: 6,
      name: "PYQs",
      src: "/assets/Navbar/PYQs.svg",
      link: "/pyqs",
    },
  ];

  const SelectedNav = useMemo(() => {
    const nav = TopNav.filter((nav) => router.pathname.startsWith(nav.link));
    return nav[nav.length - 1];
  }, [router]);

  return (
    <>
      <div
        className="fixed  w-screen h-screen top-0 left-0 z-40 bg-slate-900/50 transition-all"
        style={{
          pointerEvents: Open ? "all" : "none",
          opacity: Open ? 1 : 0,
        }}
        onClick={handleClick}
      />
      <motion.div
        className="bg-white px-8 pt-5 h-screen fixed z-50 w-10/12  font-body"
        animate={{
          x: Open ? 0 : "-100%",
        }}
        transition={{
          type: "tween",
          duration: 0.3,
        }}
      >
        <div className="flex justify-between">
          <div className="my-3">
            <img className="w-10" src="/assets/CampusCircle.svg" />
          </div>
          <button onClick={handleClick}>
            <IoClose size={32} />
          </button>
        </div>
        {TopNav.map((item, index) => {
          return (
            <Link key={item.name} href={item.link}>
              <a onClick={handleClick}>
                <div
                  className={`flex my-3 py-3 border-b px-3 border-primary/20 rounded-md
                    ${
                      router.pathname == item.link &&
                      "bg-gradient-to-br from-primary to-blue-500 text-white shadow-lg shadow-primary/20"
                    }
                  `}
                >
                  <img className="w-7 bg-white p-1 rounded-md" src={item.src} />
                  <p className="mx-3 font-semibold self-center">{item.name}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </motion.div>
      <div className="lg:hidden fixed h-14 font-body bg-gradient-to-br from-primary to-blue-500 w-full flex text-white justify-start shadow-lg">
        <button className="self-center px-4" onClick={handleClick}>
          <AiOutlineMenu size={32} />
        </button>
        <div className="self-center text-xl font-semibold">
          {SelectedNav?.name}
        </div>
      </div>
    </>
  );
}

export default Navbar;
