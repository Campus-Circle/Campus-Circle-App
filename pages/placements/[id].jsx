import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Loading from '../../components/Loading';
import { Extractor } from 'markdown-tables-to-json';
import Table from '../../components/Table';
import AppLayout from '../../components/Layout/AppLayout';
import { useDebounce } from 'use-debounce';
import useComponentSize from '@rehooks/component-size';
import { motion } from 'framer-motion';

function Placement({ id, columns, rows, markdown }) {
  const router = useRouter();
  const [Row, setRow] = useState(rows);
  const [Search, setSearch] = useState('');

  if (router.isFallback) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  function filter(array, value) {
    return array.filter((item) =>
      Object.keys(item).some((k) =>
        item[k].toString().toLowerCase().includes(value.toString().toLowerCase())
      )
    );
  }

  const [value] = useDebounce(Search, 500);

  useEffect(() => {
    console.log(value);

    const filtered = filter(rows, value);
    setRow(filtered);
  }, [value]);

  const ref = useRef(null);
  const size = useComponentSize(ref);

  return (
    <AppLayout>
      <div className="md:ml-7 font-body" ref={ref}>
        <div className="font-body pl-5">
          <h1 className="text-3xl py-5 text-primary border-b">Placements</h1>
          <p className="text-primary p-2 text-xl ">{id}</p>
        </div>

        <ReactMarkdown
          className="placement-content"
          remarkPlugins={[remarkGfm]}
          // eslint-disable-next-line react/no-children-prop
          children={markdown}
        />

        <div className="w-full pt-10">
          <div className="flex">
            <input
              className="w-full md:w-3/4 p-1 px-2 border-2 border-gray-200 rounded-lg focus:border-primary transition-all duration-500 outline-none"
              placeholder="Enter Search Value"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="self-center text-xs text-gray-400 px-3">
              {Search === value ? '' : 'Searching'}
            </span>
          </div>
          <motion.div
            style={{
              width: size.width - 20
            }}
            className="ml-2 md:ml-0 flex flex-col justify-center items-start overflow-auto">
            <Table
              columns={columns}
              data={Row ? Row : []}
              className={`w-full md:w-11/12 mt-5 rounded-sm md:rounded-md`}
              headerCellClassName={`text-white font-normal p-2 bg-primary first:rounded-l-xl last:rounded-r-xl`}
              dataCellClassName={`text-center p-2 border-b-2`}
            />
          </motion.div>
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
      id: item.name
    }
  }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(`${process.env.URL}/placements/${params.id}.md`);

  const regex = new RegExp(/((\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/g);

  const text = data.replace(regex, '');

  let table = Extractor.extractAllTables(data, 'rows', true);
  table = table[0].slice(1);

  const columns = [
    {
      Header: 'S no.',
      accessor: 'id'
    },
    {
      Header: 'Company',
      accessor: 'Company',
      disableSortBy: true
    },
    {
      Header: 'CTC(in Lakhs)',
      accessor: 'ctc'
    },
    {
      Header: 'No. of Offers',
      accessor: 'offers'
    }
  ];

  const rows = table.map((item, index) => {
    return {
      id: index + 1,
      Company: item[0],
      ctc: item[1],
      offers: item[2] === undefined ? '' : item[2]
    };
  });

  return {
    props: {
      id: params.id,
      data: data,
      columns,
      rows,
      markdown: text
    },
    revalidate: 1
  };
}
