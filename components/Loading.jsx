import React from 'react'

function Loading() {
    return (
        <div className="flex-1 h-full w-full flex flex-col justify-center items-center">
            <img className="animate-pulse rounded-2xl  shadow-lg shadow-primary/20" src="/assets/Loading.gif"/>
        </div>
    )
}

export default Loading
