import axios from 'axios'
import React from 'react'

function Course({course,syllabus}) {
    return (
        <div className="w-full p-2 md:pl-16">
            <div className="font-body text-primary font-medium mt-9 md:ml-14 p-2">
                <h1 className="text-5xl">
                    {course.url.toUpperCase()}
                </h1>
                <p className="mt-3 text-xl">
                    {course.name}
                </p>
            </div>

            <ul className="md:ml-14 md:w-1/2 mt-8 font-body text-2xl font-light">
                {syllabus.map((item,index) => {
                    return(
                        <a key={item.title} href={item.link} target="_blank">
                        <li className="my-2 py-2 px-3 hover:bg-gray-200 rounded-md hover:pl-7 transition-all cursor-pointer hover:shadow-sm">
                            {item.title}
                        </li>
                        </a>
                    )
                })}
            </ul>
        </div>
    )
}

export async function getStaticPaths() {
    const {data} = await axios.get(`${process.env.URL}/course`)

    const paths = data.map((item) => ({ params: { id: item.url } }));
    console.log(paths)
    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }){
    const id = params.id;

    const {data} = await axios.get(`${process.env.URL}/course`);

    let course = data.filter((item) => item.url == id);

    const syllabus = await axios.get(`${process.env.URL}/course/${course[0].link}`)

    console.log(course);
    console.log(syllabus.data)

    return {
        props:{
            course : course[0],
            syllabus : syllabus.data
        }
    }
}

export default Course
