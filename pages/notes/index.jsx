import axios from 'axios';
import React, { useCallback, useState } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import List from '../../components/List';
import CourseSelector from '../../components/Forms/CourseSelector';
import { toast } from 'react-toastify';

function index({ data }) {
  const [Result, setResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(data);

  const ApplyFilter = useCallback(() => {
    const FilteredData = data.filter((item) => {
      const state =
        item.course.includes(selectedOption.course?.value) &&
        item.semester.includes(selectedOption.semester?.value);
      return state;
    });

    toast('Filter Applied');
    setResult(FilteredData);
  }, [selectedOption]);

  return (
    <AppLayout>
      <div className="font-body flex flex-col  pt-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-primary text-4xl">Notes</h1>
        </div>
        <div className="flex md:flex-row flex-col gap-8 px-8 justify-evenly mt-10">
          <CourseSelector
            Options={selectedOption}
            setOptions={setSelectedOption}
            onApply={ApplyFilter}
          />
        </div>
        <div className="border-t-2 border-primary/20 mt-10 mx-5 flex flex-col gap-2 pt-5">
          <List data={Result} type="Note" />
        </div>
      </div>
    </AppLayout>
  );
}

export async function getStaticProps(context) {
  const { data } = await axios.get(`${process.env.URL}/notes/index.json`);

  return {
    props: {
      data: data
    },
    revalidate: 1
  };
}

export default index;
