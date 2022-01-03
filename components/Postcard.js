import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AiFillLike,AiOutlineLike} from 'react-icons/ai'
import axios from 'axios';

function Post(props) {

    const auth = useSelector(state => state.auth);
    const [Like, setLike] = useState(false);
    const [LikeCount, setLikeCount] = useState(0);

    useEffect(() => {
        if(props.item.isLiked == true){
            setLike(true);
        }
        setLikeCount(props.item.Likes);
    },[]);

    const config = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    };

    const LikePost = async () => {
        try {

            const res = await axios.post(`${props.URL}/post/like`,{
                id: props.item._id
            },config);
            console.log(res.data);
            if(res.data.status == 1)
                setLikeCount(res.data.likes);
            setLike(true);
        } catch (error) {
            console.log(error);
        }
    }

    const DislikePost = async () => {
        try {
            const res = await axios.post(`${props.URL}/post/dislike`, {
                id: props.item._id
            }, config);

            

            if(res.data.status === 1)
            {
                setLike(false);
                setLikeCount(res.data.likes);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='px-8 md:mr-8 py-8 my-4 shadow-lg shadow-primary/20 flex flex-col rounded-lg bg-primary/10'>
            <span className='flex'>
                <h1 className='text-lg font-semibold '>{props.item.title}</h1>
                <span className='self-end mb-1 ml-2 text-xs opacity-25'>
                    {props.item.createdAt.slice(0,10)}
                </span>
            </span>
            <p className='mt-1 text-base  text-gray-500 tracking-tight'>{props.item.description}</p>
            <div className='flex mt-3 cursor-pointer'>
                {!Like ? 
                <AiOutlineLike className='text-primary text-3xl md:text-2xl cursor-pointer' onClick={LikePost}/>
                :
                <button onClick={DislikePost}>
                <AiFillLike className='text-primary text-3xl md:text-2xl  cursor-pointer' />
                </button>
                }
                <span className='self-center ml-1 font-semibold text-primary text-xl md:text-base'>
                    {LikeCount}
                </span>
            </div>
        </div>
    )
}

export default Post
