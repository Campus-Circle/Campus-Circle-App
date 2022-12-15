import axios from 'axios';
import React, { useCallback, useState } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import List from '../../components/List';
import CourseSelector from '../../components/Forms/CourseSelector';
import { toast } from 'react-toastify';
import Info from '../../components/UI/Alerts/info';
import { useRouter } from 'next/router';
import DocCard from '../../components/UI/Card/DocCard';
import useStorage from '../../hooks/useStorage';

function index({ data }) {
  const router = useRouter();

  const [notesData, setNotesData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { listFiles } = useStorage();
  const ApplyFilter = useCallback(async () => {
    const data = await listFiles({
      type: 'Notes',
      course: selectedOption.course.value,
      semester: selectedOption.semester.value
    });

    setNotesData(data);
    toast('Filter Applied');
  }, [selectedOption]);

  return (
    <AppLayout>
      <div className="font-body flex flex-col  pt-5 p-3">
        <div className="flex flex-col justify-center items-center mb-3">
          <h1 className="text-primary text-4xl">Notes</h1>
        </div>
        <Info
          title="Have a note to share?"
          buttonText="Share it here"
          onButtonClick={() => {
            router.push('/file/share');
          }}
        />
        <div className="flex md:flex-row flex-col gap-8 px-8 justify-evenly mt-10">
          <CourseSelector
            Options={selectedOption}
            setOptions={setSelectedOption}
            onApply={ApplyFilter}
          />
        </div>
        <div className="divider" />
        {notesData.map((item, index) => {
          return <DocCard item={item} key={index} />;
        })}
      </div>
    </AppLayout>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.URL}/notes/index.json`);

  return {
    props: {
      data: data
    },
    revalidate: 1
  };
}

export default index;
