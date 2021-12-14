import axios from "axios";
import React from "react";
import Link from "next/link";

function index({ data }) {
  console.log(data);
  return (
    <div className="w-full h-screen flex flex-col items-center pt-5">
      <h1 className="text-4xl font-body font-semibold text-primary">Notes</h1>
      <ul className="items-center font-body">
        {data.map((item, index) => {
          return (
            <a href={`${item.link}`}>
              <li className="tracking-tight p-5 md:p-3 text-xl my-2 hover:bg-primary hover:text-white font-medium cursor-pointer transition-all hover:shadow-lg px-4 rounded-md">
                {item.name}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  
  console.log(process.env.URL)
  const { data } = await axios.get(`${process.env.URL}/notes/index.json`);

  console.log(data)

  return {
    props: {
      data: data,
    }
  };
}

export default index;
