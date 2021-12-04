import axios from "axios";
import React from "react";
import Link from "next/link";

function Index({data}) {
    return (
        <div className="w-full h-screen flex flex-col justify-start mt-10 items-center">
        <h1 className="text-4xl font-body font-semibold text-primary">Placements</h1>
        <ul className="items-center font-body">
          {data.map((item, index) => {
            return (
              <Link href={`placements/${item.name}`}>
                <li className="tracking-tight p-3 text-xl my-2 hover:bg-primary hover:text-white font-medium cursor-pointer transition-all hover:shadow-lg px-10 rounded-md">
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>    )
}

export async function getStaticProps(props) {
    const { data } = await axios.get(`${process.env.URL}/placements/index.json`);

    return {
      props: {
        data: data,
      },
    };
  }
  

export default Index
