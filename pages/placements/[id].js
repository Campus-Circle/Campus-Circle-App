import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "../../components/Loading";

function Placement({ id, data }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full md:ml-28">
      <div className="font-body pl-5">
        <h1 className="text-3xl py-5 text-primary border-b">Placements</h1>
        <p className="text-primary p-2 text-xl">{id}</p>
      </div>

      <ReactMarkdown
        className="placement-table"
        remarkPlugins={[remarkGfm]}
        children={data}
      />
    </div>
  );
}

export default Placement;

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.URL}/placements/index.json`);
  const paths = data.placement.map((item) => ({
    params: {
      id: item.name,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `${process.env.URL}/placements/${params.id}.md`
  );
  return {
    props: {
      id: params.id,
      data: data,
    },
    revalidate: 1,
  };
}
