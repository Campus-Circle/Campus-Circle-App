import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Select from "react-select";
import Table from "../../components/Table";
import { motion, AnimatePresence } from "framer-motion";
import useComponentSize from "@rehooks/component-size";
import AppLayout from "../../components/Layout/AppLayout";
import { CourseGenerator } from "../../utils/LinkGen";
function index({ data, college }) {
  const CourseOptions = [
    {
      value: "CSE",
      label: "Computer Science Engineering",
    },
    {
      value: "ECE",
      label: "Electronics and Communication Engineering",
    },
    {
      value: "EE",
      label: "Electrical Engineering",
    },
  ];

  const ref = React.useRef(null);
  const size = useComponentSize(ref);

  const YearOptions = Array(8)
    .fill(0)
    .map((item, index) => {
      return {
        value: index + 1,
        label: `${index + 1} Semester`,
      };
    });

  const [selectedOption, setselectedOption] = useState({
    course: "",
    year: "",
  });

  const [TableData, setTableData] = useState({
    data: [],
    columns: [],
  });

  const columns = [
    {
      Header: "Paper Code",
      accessor: "Paper Code",
      width: 150,
      Cell: ({ row }) => {
        if (row.original.Link === true) {
          return (
            <a
              href={CourseGenerator(
                selectedOption.year,
                selectedOption.course,
                row.original["Paper Code"]
              )}
              className="text-primary border-b border-transparent hover:border-primary"
              target="_blank"
            >
              {row.original["Paper Code"]}
            </a>
          );
        }

        return row.original["Paper Code"];
      },
    },
    {
      Header: "Paper Name",
      accessor: "Paper Name",
      width: 200,
    },
    {
      Header: "End Term Marks",
      accessor: "End Term Marks",
    },
    {
      Header: "Mid Term Marks",
      accessor: "Mid Term Marks",
    },
    {
      Header: "Total Marks",
      accessor: "Total Marks",
    },
    {
      Header: "Credit",
      accessor: "Credit",
    },
    {
      Header: "Type",
      accessor: "Type",
    },
  ];

  useEffect(() => {
    if (selectedOption.course === "" || selectedOption.year === "") return;
    let course = selectedOption.course;
    if (parseInt(selectedOption.year) < 3) {
      course = "ALL";
    }

    console.log(data[course]);

    setTableData(() => {
      return {
        data: data[course].filter((item) => {
          console.log(item.Semester, selectedOption.year);
          return parseInt(item.Semester) === parseInt(selectedOption.year);
        }),
        columns: columns,
      };
    });
  }, [selectedOption]);

  return (
    <AppLayout>
      <div className="h-screen flex flex-grow flex-col pt-5">
        <Head>
          <title>{`Courses - ${college}`}</title>
          <meta name="og:title" content={`Courses - ${college}`} />
          <meta name="twitter:title" content={`Courses - ${college}`} />
        </Head>
        <div
          className="md:ml-10 font-body justify-center items-center flex flex-col mt-10"
          ref={ref}
        >
          <h1 className="text-xl">
            Courses In <span className="text-primary">{college}</span>
          </h1>
          <div className="flex gap-5 my-2 md:gap-10 w-full justify-center items-center md:justify-evenly  md:flex-row flex-col">
            <div className="w-80 md:my-4">
              <Select
                isSearchable={false}
                options={CourseOptions}
                placeholder="Select Course"
                onChange={(e) =>
                  setselectedOption({ ...selectedOption, course: e.value })
                }
              />
            </div>
            <div className="w-80 md:my-4">
              <Select
                isSearchable={false}
                options={YearOptions}
                placeholder="Select Year"
                onChange={(e) =>
                  setselectedOption({ ...selectedOption, year: e.value })
                }
              />
            </div>
          </div>
          <AnimatePresence exitBeforeEnter>
            {selectedOption.course === "" ||
            selectedOption.year === "" ? null : (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                // style={{
                //   width: size.width,
                // }}
                className=" w-screen md:w-auto overflow-auto"
              >
                <Table
                  data={TableData.data}
                  columns={TableData.columns}
                  className="mx-2 p-3 rounded-md my-3 w-screen md:w-auto overflow-hidden"
                  headerRowClassName="text-xs  border-y border-primary "
                  headerCellClassName="whitespace-no-wrap text-center p-2 text-primary cursor-pointer  border-primary"
                  rowCellClassName="  p-2 hover:bg-primary/5"
                  dataCellClassName="p-2 border-b text-xs md:text-sm"
                  headerFontWeight={500}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}

export async function getStaticProps(context) {
  console.log(process.env.URL);
  const { data } = await axios.get(`${process.env.URL}/course/list.json`);
  const college = process.env.COLLEGE;

  console.log(data);

  return {
    props: {
      data: data,
      college: college,
    },
    revalidate: 1,
  };
}

export default index;
