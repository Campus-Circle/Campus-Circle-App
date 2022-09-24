import React from 'react'

function Comment(props) {
    return (
        <div className=" ml-5 mt-3 mr-3 p-3 rounded-lg shadow-md bg-white">
        <p className="ml-1 text-sm opacity-30">
          by {props.name}
        </p>
        <p className="p-2 px-3 text-gray-600">
          {props.comment}
        </p>
      </div>
    )
}

export default Comment
