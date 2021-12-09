import axios from "axios";
import React from "react";
import Link from "next/link";
import Head from "next/head";

function index({ data, college }) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Head>
        <title>{ `Courses - ${college}` }</title>
        <meta name="og:title" content={ `Courses - ${college}` } />
        <meta name="twitter:title" content={ `Courses - ${college}` } />
      </Head>
      <h1 className="text-4xl font-body font-semibold text-primary">Courses</h1>
      <ul className="items-center font-body">
        {data.map((item, index) => {
          return (
            <Link key={item.name} href={`course/${item.url}`}>
              <li className="tracking-tight p-5 md:p-3 text-xl my-2 hover:bg-primary hover:text-white font-medium cursor-pointer transition-all hover:shadow-lg px-4 rounded-md">
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps(props) {
  
  console.log(process.env.URL)
  const { data } = await axios.get(`${process.env.URL}/course`);
  const college = process.env.COLLEGE

  console.log(data)

  return {
    props: {
      data: data,
      college: college
    },
  };
}

export default index;
