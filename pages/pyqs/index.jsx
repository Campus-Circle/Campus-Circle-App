import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import CourseSelector from '../../components/Forms/CourseSelector';
import AppLayout from '../../components/Layout/AppLayout';
import { GoLinkExternal } from 'react-icons/go';
import { CourseGenerator, PYQGenerator } from '../../utils/LinkGen';

function PYQ({ courses, pyq }) {
  console.log(courses, pyq);
  const [selectedOption, setSelectedOption] = useState(null);
  const [Result, setResult] = useState({
    courses: [],
    pyq: []
  });

  useEffect(() => {
    if (selectedOption?.course && selectedOption?.semester) {
      ApplyFilter();
    }
  }, [selectedOption]);

  const ApplyFilter = useCallback(() => {
    const FilteredCourses = courses[
      selectedOption.semester?.value < 3 ? 'ALL' : selectedOption.course?.value
    ]
      .filter((item) => item.Semester === selectedOption.semester.value)
      .map((item) => {
        return {
          ...item,
          pyq: pyq.filter((pyq) => pyq['Paper Code'] === item['Paper Code'])
        };
      });

    console.log(FilteredCourses);

    const FilteredPYQ = pyq.filter((item) => {
      return (
        item.course === selectedOption.course?.value &&
        item.semester === selectedOption.semester?.value
      );
    });

    setResult({
      courses: FilteredCourses
    });
  }, [selectedOption]);

  return (
    <AppLayout>
      <div className="font-body flex flex-col ">
        <div className="flex justify-center items-center py-5">
          <h1 className="text-lg font-semibold">Previous Year Questions PYQs</h1>
        </div>
        <div className="flex md:flex-row flex-col gap-8 px-8 justify-evenly mt-10">
          <CourseSelector
            Options={selectedOption}
            setOptions={setSelectedOption}
            onApply={ApplyFilter}
            isButtonDisabled={true}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-2 w-11/12 py-4">
            {Result.courses.map((item) => (
              <div className="card ">
                <div className="card-title">{item['Paper Name']}</div>
                <div className="card-body">
                  <div className="flex text-sm  opacity-40">{item['Paper Code']}</div>
                  <div className="pt-6 flex flex-col">
                    <a
                      href={CourseGenerator(
                        selectedOption?.course?.value,
                        selectedOption?.semester?.value,
                        item['Paper Code']
                      )}
                      className="flex text-primary underline underline-offset-4"
                    >
                      <GoLinkExternal className="pr-1 self-center" /> Course Structure
                    </a>

                    <div className="flex flex-col gap-2 pt-2">
                      {item.pyq.map((pyq) => (
                        <a
                          href={PYQGenerator(
                            selectedOption?.course?.value,
                            selectedOption?.semester?.value,
                            pyq.fileName
                          )}
                          className="flex text-primary underline underline-offset-4"
                        >
                          <GoLinkExternal className="pr-1 self-center" />
                          {pyq.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export async function getStaticProps(context) {
  const { data } = await axios.get(`${process.env.URL}/course/list.json`);
  const { data: pyq } = await axios.get(`${process.env.URL}/pyq/index.json`);
  const college = process.env.COLLEGE;

  return {
    props: {
      courses: data,
      pyq: pyq,
      college: college
    },
    revalidate: 1
  };
}

export default PYQ;
