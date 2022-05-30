import axios from "axios";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import List from "../../components/List";
import AppLayout from "../../components/Layout/AppLayout";
import LinkButton from "../../components/Button/LinkButton";

function Index({ data, reports, college }) {
  console.log(reports);
  return (
    <AppLayout>
      <div className="h-screen flex flex-col items-center font-body md:items-start md:justify-start pt-10 md:ml-20 text-center md:text-left">
        <Head>
          <title>{`Placements - ${college}`}</title>
          <meta name="og:title" content={`Placements - ${college}`} />
          <meta name="twitter:title" content={`Placements - ${college}`} />
        </Head>

        <div className=" w-full flex flex-col items-center ">
          <h1 className="text-3xl text-primary">Placements</h1>
          <div className="w-full flex flex-col  flex-grow">
            <p className="text-lg py-3">
              See Placement Statistics for the year
            </p>
            <div className="w-3/4 flex flex-col gap-5">
              {data
                .sort((a, b) => a.name < b.name)
                .map((item) => (
                  <LinkButton item={item} />
                ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <p className="py-3 mt-5 text-lg">Placement Reports</p>
          <div className="w-3/4 flex flex-col gap-5">
            {reports
              .sort((a, b) => a.name < b.name)
              .map((item) => (
                <Link href={item.link}>
                  <span className="px-4 py-2 text-primary bg-transparent hover:bg-slate-100 rounded-lg hover:pl-6 cursor-pointer transition-all duration-500">
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
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
