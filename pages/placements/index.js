import axios from "axios";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import List from "../../components/List";

function Index({ data, reports, college }) {
  return (
    <div className="w-screen md:w-full h-screen flex flex-col items-center md:items-start md:justify-start pt-10 md:ml-20 text-center md:text-left">
      <Head>
        <title>{`Placements - ${college}`}</title>
        <meta name="og:title" content={`Placements - ${college}`} />
        <meta name="twitter:title" content={`Placements - ${college}`} />
      </Head>
      <List title="Placements" data={data} listItemClassName="w-3/4" />

      <hr className="border-primary border-t-4 w-5/6 opacity-30 rounded-full my-8" />

      <List title="Placement Reports" data={reports} />
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.URL}/placements/index.json`);
  console.log(data);
  const college = process.env.COLLEGE;
  return {
    props: {
      data: data.placement.map((item) => ({
        name: item.name,
        link: `/placements/${item.name}`,
      })),
      reports: data.report,
      college: college,
    },
    revalidate: 1,
  };
}

export default Index;
