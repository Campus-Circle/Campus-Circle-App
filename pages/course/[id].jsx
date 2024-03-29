import axios from 'axios';
import React from 'react';

function Course({ course, syllabus }) {
  return (
    <div className="w-full p-2 md:pl-16">
      <div className="font-body text-primary font-medium mt-9 md:ml-14 p-2">
        <h1 className="text-5xl">{course.url.toUpperCase()}</h1>
        <p className="mt-3 text-xl">{course.name}</p>
      </div>

      <ul className="md:ml-14 md:w-1/2 mt-8 font-body text-2xl font-light">
        {syllabus.map((item) => {
          return (
            <a key={item.title} href={item.link} target="_blank" rel="noreferrer">
              <li className="my-2 py-2 px-3 hover:bg-gray-200 rounded-md hover:pl-7 transition-all cursor-pointer hover:shadow-sm">
                {item.title}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const { data } = await axios.get(`${process.env.URL}/course/index.json`);

  let course = data.filter((item) => item.url == id);

  const syllabus = await axios.get(`${process.env.URL}/course/${course[0].link}`);

  console.log(course);
  console.log(syllabus.data);

  return {
    props: {
      course: course[0],
      syllabus: syllabus.data
    }
  };
}

export default Course;
