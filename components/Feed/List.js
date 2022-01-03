import React from "react";
import { AiFillFire, AiTwotoneWarning, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

function List() {
  return (
    <>
      <ul className="flex mt-6">
        <Link href="/feed/hot" className="">
          <li className="flex px-2 rounded-lg md:px-5 mr-4 md:py-2 cursor-pointer border  border-primary md:rounded-full ">
            <AiFillFire className="text-primary self-center" />
            <span className="self-center pl-1 font-semibold text-primary">
              HOT
            </span>
          </li>
        </Link>

        <Link href="/feed/new">
          <li className="flex px-2 rounded-lg  md:px-5 md:py-2 border cursor-pointer bg-primary border-primary md:rounded-full">
            <AiTwotoneWarning className="text-white self-center" />
            <span className="self-center pl-1 font-semibold text-white">
              NEW
            </span>
          </li>
        </Link>
        <li className="flex-grow"></li>
        <Link href="/post/new">
          <li className=" px-2 py-2 rounded-lg md:px-5 md:py-2 bg-primary mr-5 md:rounded-full text-white shadow-sm transition-all cursor-pointer hover:shadow-lg font-semibold flex">
            <AiOutlinePlus className="self-center text-lg mx-1" />
            <span>Create a Post</span>
          </li>
        </Link>
      </ul>
    </>
  );
}

export default List;
