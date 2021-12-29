import React from 'react'

import {AiFillLike,AiOutlineLike} from 'react-icons/ai'

function Post(props) {
    return (
        <div className='px-8 md:mr-8 py-8 my-4 shadow-lg flex flex-col rounded-lg bg-gray-400/10'>
            <span className='flex'>
                <h1 className='text-lg font-semibold '>{props.item.title}</h1>
                <span className='self-end mb-1 ml-2 text-xs opacity-25'>
                    {props.item.createdAt.slice(0,10)}
                </span>
            </span>
            <p className='mt-1 text-base  text-gray-500 tracking-tight'>{props.item.description}</p>
            {/* <div>
                <AiOutlineLike className='text-primary text-2xl mt-3'/>
            </div> */}
        </div>
    )
}

export default Post
