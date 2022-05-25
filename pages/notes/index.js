import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import List from "../../components/List";
import AppLayout from "../../components/Layout/AppLayout";
import Select from "react-select";
import { IoSearch } from "react-icons/io5";
import Table from "../../components/Table";
import LinkButton from "../../components/Button/LinkButton";

function index({ data }) {
  console.log(data);

  const [Info, setInfo] = useState(data);
  const [SearchValue, setSearchValue] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(SearchValue.toLowerCase())
    );
    setInfo(filteredData);
  }, [SearchValue]);

  return (
    <AppLayout>
      <div className="font-body h-screen flex flex-col  pt-5 md:ml-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-primary text-4xl">Notes</h1>
          <p className="my-4 opacity-20">All your notes at one place UwU</p>
        </div>
        <div className="flex flex-col w-1/2">
          <p className="mx-2 text-xs text-primary font-semibold">Search</p>
          <input
            className="w-full outline-none mx-2 p-1"
            type="text"
            placeholder="Enter your search term"
            value={SearchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {Info.map((item) => (
            <LinkButton item={item} />
          ))}
        </div>
      </div>
    </AppLayout>
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
