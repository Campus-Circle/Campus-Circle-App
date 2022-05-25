import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "../../components/Loading";
import { Extractor } from "markdown-tables-to-json";
import Table from "../../components/Table";
import AppLayout from "../../components/Layout/AppLayout";
function Placement({ id, data, columns, rows }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="md:ml-28 font-body">
        <div className="font-body pl-5">
          <h1 className="text-3xl py-5 text-primary border-b">Placements</h1>
          <p className="text-primary p-2 text-xl ">{id}</p>
        </div>

        <div className="w-full">
          <Table
            columns={columns}
            data={rows}
            className={`w-full md:w-11/12 mt-5 rounded-md`}
            headerCellClassName={`text-white font-normal p-2 bg-primary first:rounded-l-xl last:rounded-r-xl`}
            dataCellClassName={`text-center p-2 border-b-2`}
          />
        </div>

        {/* <ReactMarkdown
        className="placement-table"
        remarkPlugins={[remarkGfm]}
        children={data}
      /> */}
      </div>
    </AppLayout>
  );
}

export default Placement;

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.URL}/placements/index.json`);
  console.log(JSON.parse(JSON.stringify(data)));
  const paths = data.placement?.map((item) => ({
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

  let table = Extractor.extractAllTables(data, "rows", true);
  table = table[0].slice(1);

  const columns = [
    {
      Header: "S no.",
      accessor: "id",
    },
    {
      Header: "Company",
      accessor: "Company",
      disableSortBy: true,
    },
    {
      Header: "CTC(in Lakhs)",
      accessor: "ctc",
    },
    {
      Header: "No. of Offers",
      accessor: "offers",
    },
  ];

  const rows = table.map((item, index) => {
    return {
      id: index + 1,
      Company: item[0],
      ctc: item[1],
      offers: item[2] === undefined ? "" : item[2],
    };
  });

  return {
    props: {
      id: params.id,
      data: data,
      columns,
      rows,
    },
    revalidate: 1,
  };
}
