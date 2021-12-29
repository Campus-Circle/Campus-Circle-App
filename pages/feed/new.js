import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

import { AiFillFire, AiTwotoneWarning, AiOutlinePlus } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";

import Post from "../../components/Postcard";

import Link from "next/link";

function Feed({ URL }) {
  const state = useSelector((state) => state.auth);
  const [postFeed, setFeed] = useState([]);

  useEffect(() => {
    axios.post(`${URL}/validate`,null,{
        headers: {
            Authorization : `Bearer ${state.token}`
        }
    }).catch(err => {
      alert("Please Sign In First!")
      if(err.response.status === 403){
            window.location.href = '/auth/login'
        }
    })
}, [])



  useEffect(async () => {
    axios
      .get(`${URL}/feed/new/1`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFeed(res.data.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  return (
    <div className="md:ml-20 mt-8 w-full font-body">
      <h1 className="text-4xl drop-shadow text-primary tracking-tight font-semibold">
        Feed
      </h1>

      <ul className="flex mt-6">
        <Link href="/feed/hot">
          <li className="flex px-5 mr-5 py-2 border cursor-pointer bg-primary border-primary rounded-full">
            <AiFillFire className="text-white self-center" />
            <span className="self-center pl-1 font-semibold text-white">
              HOT
            </span>
          </li>
        </Link>
        <Link href="/feed/new">
          <li className="flex px-5 mr-4 py-2 border cursor-pointer border-primary rounded-full">
            <AiTwotoneWarning className="text-primary self-center" />
            <span className="self-center pl-1 font-semibold text-primary">
              NEW
            </span>
          </li>
        </Link>
        <li className="flex-grow"></li>
        <Link href="/post/new">
          <li className="px-5 py-2 bg-primary mr-5 rounded-full text-white shadow-sm transition-all cursor-pointer hover:shadow-lg font-semibold flex">
            <AiOutlinePlus className="self-center text-lg mx-1" />
            <span>Create a Post</span>
          </li>
        </Link>
      </ul>

      {postFeed.map((item, index) => {
        return <Post item={item} index={index} />;
      })}
    </div>
  );
}

export default Feed;

export async function getServerSideProps(context) {
  const URL = process.env.API;

  return {
    props: {
      URL,
    },
  };
}
