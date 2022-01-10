import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useRouter } from "next/router";  

import {RiSendPlaneFill} from 'react-icons/ri'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import Comment from "../../components/Post/Comment";

function SinglePost({ URL, id }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLike,setLike] = useState({
    isLike: false,
    count: 0
  });
  
  const auth = useSelector((state) => state.auth);
  const router = useRouter();


  useEffect(async () => {
    try {
      const res = await axios.post(
        `${URL}/post/single/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (res.data.status === 1) {
        console.log(res.data)
        setPost({
          post: res.data.post,
          user: res.data.user,
          isLiked: res.data.isLiked,
        });

        setLike({
          isLike: res.data.isLiked,
          count: res.data.post.Likes,
        })

        setLoading(false);
        // alert("Data Loaded")
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  const LikePost = async () => {
    try {
      const res = await axios.post(
        `${URL}/post/like`,
        {
          id: post.post._id,
        },
        config
      );
      console.log(res.data);
      if (res.data.status == 1)
      setLike({
        isLike: true,
        count: post.post.Likes+1
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DislikePost = async () => {
    try {
      const res = await axios.post(
        `${URL}/post/dislike`,
        {
          id: post.post._id,        
        },
        config
      );

      if (res.data.status === 1) {
        setLike({
          isLike: false,
          count: post.post.Likes-1
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  if(loading)
  {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    )
  }else
  return (
    <div className="pl-0 md:pl-9  pt-7 flex flex-col w-full min-h-screen font-body ">
      <div className="pl-5 pb-9">
        <h1 className="pl-2 text-4xl mb-2 font-semibold">{post.post.title}</h1>
        <span className="pl-2 mt-4 text-gray-300">
          At {post.post.createdAt.substring(0, 10)}
        </span>

        <div className="ml-2 mt-4 px-4 py-2 text-white bg-primary rounded-full shadow-lg flex w-fit justify-center shadow-primary/20">
          Post by {post.user.name}
        </div>
        <div className="pl-3 pt-6">
          <button 
            onClick={() => {
              if(isLike.isLike == false) 
              {
                LikePost();
              }else{
                DislikePost();
              }
            }}
          >
            {
              isLike.isLike ?
              <div className="flex">
                <AiFillLike className="w-7 h-7 text-primary" />
                <span className="self-center ml-2 pt-1 text-primary">
                  {isLike.count}
                </span>
              </div>
              :
              <div className="flex ">
              <AiOutlineLike className="w-7 h-7 text-gray-300" />
              <span className="self-center ml-2 pt-1 text-primary">
                  {isLike.count}
                </span>
              </div>
            }
          </button>
        </div>
      </div>

      <div className="bg-gray-100 flex-grow">
        <div >
          <Formik
            initialValues={{
              comment: '',
            }}

            onSubmit={async (values) => {
              try {
                const res = await axios.post(
                  `${URL}/post/addcomment`,
                  {
                    id: id,
                    comment: values.comment,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${auth.token}`,
                    },
                  }
                );

                if (res.data.status === 1) {
                  // alert("Comment Added");
                  router.reload(window.location.pathname)                
                }
              } catch (error) {
              }
            }}
          >
            <Form className="flex w-full p-4 px-8">
              <div className="flex w-full bg-white px-2 py-2 rounded-full shadow-md ">
          <Field className="flex-grow p-3 outline-none" name='comment' placeholder='Add your Comment'  />
          <button className="w-11">
            <RiSendPlaneFill className="w-7 h-7 text-primary" />
           </button>
           </div>
           </Form>
           </Formik>
        </div>
        <hr/>

        <div className="flex flex-col w-full">
            {
              post.post.Comments.map((comment, index) => {
                return(
                  <div>
                    <Comment name={comment.Name} comment={comment.content} />
                  </div>
                )
              })
            }
        </div>

      </div>

    </div>
  );
}

export async function getServerSideProps(context) {
  const URL = process.env.API;
  const { id } = context.query;

  return {
    props: {
      id,
      URL,
    },
  };
}

export default SinglePost;
