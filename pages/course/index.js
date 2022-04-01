import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import { useSelector } from "react-redux";
import List from "../../components/List";

function index({ data, college }) {
  return (
    <div className="w-full h-screen flex flex-col pt-5">
      <Head>
        <title>{`Courses - ${college}`}</title>
        <meta name="og:title" content={`Courses - ${college}`} />
        <meta name="twitter:title" content={`Courses - ${college}`} />
      </Head>
      <div className="md:ml-20">
        <List
          titleClassName="text-center md:text-start"
          title="Courses"
          data={data}
          listItemClassName="w-full text-center md:text-start flex flex-col items-center md:items-start justify-center text-base md:w-2/3"
        />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  console.log(process.env.URL);
  const { data } = await axios.get(`${process.env.URL}/course/index.json`);
  const college = process.env.COLLEGE;

  console.log(data);

  return {
    props: {
      data: data.map((item) => ({
        name: item.name,
        link: `/course/${item.url}`,
      })),
      college: college,
    },
    revalidate: 1,
  };
}

export default index;
