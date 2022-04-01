import axios from "axios";
import React from "react";
import Link from "next/link";
import Head from "next/head";

function Index({ data, reports, college }) {
  return (
    <div className="w-full h-screen flex flex-col justify-start pt-10 md:ml-28">
      <Head>
        <title>{`Placements - ${college}`}</title>
        <meta name="og:title" content={`Placements - ${college}`} />
        <meta name="twitter:title" content={`Placements - ${college}`} />
      </Head>
      <h1 className="text-3xl font-body font-semibold text-primary">
        Placements Records
      </h1>
      <ul className="items-center font-body">
        {data.map((item, index) => {
          return (
            <Link key={item.name} href={`placements/${item.name}`}>
              <li className="tracking-tight p-3 text-xl my-2 hover:bg-primary/10 text-primary font-medium cursor-pointer transition-all px-10 rounded-md w-3/5 hover:translate-x-2">
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>

      <hr className="border-primary border-t-4 w-5/6 opacity-30 rounded-full my-8" />

      <h1 className="text-3xl font-body font-semibold text-primary py-6">
        Placement Reports
      </h1>
      <ul className="items-center font-body">
        {reports.map((item, index) => {
          return (
            <a href={item.link} target="_blank" key={index}>
              <li className="tracking-tight p-3 text-xl my-2 hover:bg-primary/10 text-primary font-medium cursor-pointer transition-all px-10 rounded-md w-3/5 hover:translate-x-2 ">
                {item.name}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.URL}/placements/index.json`);
  console.log(data);
  const college = process.env.COLLEGE;
  return {
    props: {
      data: data.placement,
      reports: data.report,
      college: college,
    },
    revalidate: 1,
  };
}

export default Index;
