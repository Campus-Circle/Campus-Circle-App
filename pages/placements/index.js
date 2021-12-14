import axios from "axios";
import React from "react";
import Link from "next/link";
import Head from "next/head";

function Index({data, college}) {
    return (
        <div className="w-full h-screen flex flex-col justify-start mt-10 items-center">
        <Head>
          <title>{ `Placements - ${college}` }</title>
          <meta name="og:title" content={ `Placements - ${college}` } />
          <meta name="twitter:title" content={ `Placements - ${college}` } />
        </Head>
        <h1 className="text-4xl font-body font-semibold text-primary">Placements</h1>
        <ul className="items-center font-body">
          {data.map((item, index) => {
            return (
              <Link key={item.name} href={`placements/${item.name}`}>
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
    const { data } = await axios.get(`${process.env.URL}/placements`);
    const college = process.env.COLLEGE;
    return {
      props: {
        data: data,
        college: college
      }, revalidate: 20,
    };
  }
  

export default Index
