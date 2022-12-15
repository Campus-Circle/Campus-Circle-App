import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import CourseSelector from '../../components/Forms/CourseSelector';
import AppLayout from '../../components/Layout/AppLayout';
import DocCard from '../../components/UI/Card/DocCard';
import Info from '../../components/UI/Alerts/info';
import { useRouter } from 'next/router';
import useStorage from '../../hooks/useStorage';
import dayjs from 'dayjs';

function PYQ({ courses, pyq }) {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(null);
  const [PYQData, setPYQData] = useState([]);

  const { listFiles } = useStorage();

  const handleApply = useCallback(async () => {
    const data = await listFiles({
      type: 'PYQ',
      course: selectedOption.course.value,
      semester: selectedOption.semester.value
    });
    setPYQData(data);
  }, [selectedOption]);

  return (
    <AppLayout>
      <div className="font-body flex flex-col ">
        <div className="flex justify-center items-center py-5">
          <h1 className="text-lg font-semibold">Previous Year Questions PYQs</h1>
        </div>
        <div className="m-2 mb-3">
          <Info
            buttonText="Share PYQs"
            onButtonClick={() => {
              router.push('/file/share');
            }}
            title="Have PYQs to share?"
          />
        </div>

        <div className="flex md:flex-row flex-col gap-8 px-8 justify-evenly ">
          <CourseSelector
            Options={selectedOption}
            setOptions={setSelectedOption}
            onApply={handleApply}
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full m-3 mx-8">
          {PYQData.map((item, index) => {
            return <DocCard item={item} key={index} />;
          })}
        </div>
      </div>
    </AppLayout>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.URL}/course/list.json`);
  const college = process.env.COLLEGE;

  return {
    props: {
      courses: data,
      college: college
    },
    revalidate: 1
  };
}

export default PYQ;
