import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "../../components/Loading";
import { Extractor } from "markdown-tables-to-json";
import Table from "../../components/Table";
import AppLayout from "../../components/Layout/AppLayout";
import { useDebounce } from "use-debounce";
function Placement({ id, data, columns, rows, markdown }) {
  const router = useRouter();
  const [Row, setRow] = useState(rows);
  console.log(Row);
  const [Search, setSearch] = useState("");

  if (router.isFallback) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  function filter(array, value, key) {
    return array.filter((item) =>
      Object.keys(item).some((k) =>
        item[k]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
      )
    );
  }

  const [value] = useDebounce(Search, 500);

  useEffect(() => {
    console.log(value);

    const filtered = filter(rows, value);
    setRow(filtered);
  }, [value]);

  return (
    <AppLayout>
      <div className="md:ml-7 font-body">
        <div className="font-body pl-5">
          <h1 className="text-3xl py-5 text-primary border-b">Placements</h1>
          <p className="text-primary p-2 text-xl ">{id}</p>
        </div>

        <ReactMarkdown
          className="placement-content"
          remarkPlugins={[remarkGfm]}
          children={markdown}
        />

        <div className="w-full pt-10">
          <div className="flex">
            <input
              className="w-3/4 p-1 px-2 border-2 border-gray-200 rounded-lg focus:border-primary transition-all duration-500 outline-none"
              placeholder="Enter Search Value"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="self-center text-xs text-gray-400 px-3">
              {Search === value ? "" : "Searching"}
            </span>
          </div>
          <Table
            columns={columns}
            data={Row ? Row : []}
            className={`w-full md:w-11/12 mt-5 rounded-md`}
            headerCellClassName={`text-white font-normal p-2 bg-primary first:rounded-l-xl last:rounded-r-xl`}
            dataCellClassName={`text-center p-2 border-b-2`}
          />
        </div>
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

  const regex = new RegExp(
    /((\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/g
  );

  const text = data.replace(regex, "");

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
      markdown: text,
    },
    revalidate: 1,
  };
}
