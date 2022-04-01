import axios from "axios";
import React from "react";
import Link from "next/link";
import List from "../../components/List";

function index({ data }) {
  console.log(data);
  return (
    <div className="w-full h-screen flex flex-col  pt-5 md:ml-20">
      <List
        title="Notes"
        data={data}
        titleClassName="text-center md:text-left"
      />
    </div>
  );
}

export async function getStaticProps(context) {
  console.log(process.env.URL);
  const { data } = await axios.get(`${process.env.URL}/notes/index.json`);

  console.log(data);

  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
}

export default index;
