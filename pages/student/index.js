import React, { useEffect, useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import {useSelector , useDispatch} from 'react-redux'

import axios from 'axios';
import Loading from '../../components/Loading';


function Student({URL}) {
    
    const [StudentList,setStudentList] = useState([]);

    const auth = useSelector(state => state.auth)

    const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
    };
    
    useEffect(() => {

        console.log(config)
        console.log(auth.token)
        axios.post(`${URL}/validate`, {
            key: 'value'
        } ,config).then(res => {
            
        }).catch(err => {
            console.log(err.response.data)
            alert("Please Sign In First!")
            if(err.response.status === 403){
                window.location.href = '/auth/login'
            }
        })
    }, [])


    return (
        <div className='flex flex-col justify-center items-center w-full py-5'>
            <Formik
                initialValues={{
                    branch: 'ECE',
                    year: '2020',
                }}
                onSubmit={async (values) => {
                    console.log(values);
                    console.log(JSON.stringify(config));
                    axios.get(`${URL}/find/${values.branch}/${values.year}`,{
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    }).then((res) => {
                        console.log(res.data.data);
                        setStudentList(res.data.data);
                    }).catch((err) => {
                        console.log(err.response.data);
                        alert('Error');
                    });
                }}
            >

                <Form className="flex font-body flex-col justify-center items-center"

  
                
                >
                    <h2 className="text-3xl tracking-tight font-semibold text-primary">Students List</h2>
                    <p className="my-2 text-gray-400 font-light">*Only students who have registered will be present in the list</p>
                    <div>
                    <Field name="year" component="select" className="px-4 py-3 rounded-md bg-primary text-white font-bold shadow-md my-1 w-28">
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </Field>
                    <Field name="branch" component="select" className="px-4 py-3 rounded-md bg-primary text-white font-bold shadow-md my-1 mx-4 w-28">
                        <option value="ECE">ECE</option>
                        <option value="EE">EE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="CSE">CSE</option>
                    </Field>
                    </div>
                    <button className="my-4 px-4 py-3 shadow-lg bg-gray-100 rounded-md border-2 border-primary text-primary font-semibold">
                        Submit
                    </button>
                </Form>

            </Formik>
            <hr />



            <div className="w-11/12 border-t pt-6">
                
                <table className="w-full font-body">
                    <thead className='bg-primary'>
                        <tr className=''>
                            {
                                ["Name","Branch","Year","Email"].map((item,index) => {
                                    return (
                                        <th key={index} className="text-center font-semibold py-1 text-white ">{item}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>

                    {StudentList.map((student) => {
                            return (
                                <tr className="text-center">
                                    <td className="py-2 w-1/4">{student.name}</td>
                                    <td className="py-2 w-1/4">{student.Branch}</td>
                                    <td className="py-2 w-1/4">{student.Year}</td>
                                    <td className="py-2 w-1/4">{student.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {StudentList.length === 0 ? <div className="text-center mt-5 w-full font-body italic text-gray-400">
                Sorry! No record exists
                </div>: null}
            </div>
        </div>
    )
}

export default Student

export async function getServerSideProps(context) {
    const URL = process.env.API;
  
    return {
      props: {
        URL,
      },
    }
  }