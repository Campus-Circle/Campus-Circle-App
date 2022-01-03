import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

import { AiFillFire, AiTwotoneWarning, AiOutlinePlus } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";

import Post from "../../components/Postcard";
import List from "../../components/Feed/List";
import Link from "next/link";

import Loading from "../../components/Loading";

function Feed({ URL }) {
  const state = useSelector((state) => state.auth);
  const [postFeed, setFeed] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if(state.isAuth == true)
    {
        setLoading(false);
    }else{
      alert('Please Login First');
      window.location.href = '/auth/login';  
        setLoading(true);
    }
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

  if (loading === true) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="md:ml-20 mt-8 w-full font-body">
      <h1 className="text-4xl drop-shadow text-primary tracking-tight font-semibold text-center md:text-left">
        Feed
      </h1>

      <List />
  
      {postFeed === []? <Loading/> : null}

      {postFeed.map((item, index) => {
        return <Post item={item} index={index} URL={URL}/>;
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
