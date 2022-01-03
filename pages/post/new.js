import React, { useState } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import auth from '../../redux/counter/auth';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'


function Post({URL}) {

    const router = useRouter();

    const state = useSelector(state => state.auth);

    const [Disabled,setDisabled] = useState(true);

    return (
        <div className="flex justify-center items-center w-full md:my-20">
            <Formik 
                initialValues={{
                    title: '',
                    content: '',
                }}

                validate={values => {
                    const errors = {};

                    if( values.title === '' || values.content == '' ){
                        setDisabled(true);

                    }else{
                        setDisabled(false);
                    }

                    return errors;
                }}

                onSubmit={async (values) => {
                    // alert(JSON.stringify(values, null, 2));

                    axios.post(`${URL}/post/add`, {
                        title: values.title,
                        description: values.content
                    },{
                        headers: {
                            Authorization: `Bearer ${state.token}`
                        }
                    }).then(res => {
                        console.log(res.data);
                        
                        toast.success("Post Created");
                        
                        setTimeout(() => {
                            router.push('/feed/hot');
                        }, 2000);


                    }).catch(err => {
                        console.log(err);
                        toast.error("Error");
                    });

                }}

            >
                <Form className="flex flex-col justify-center items-center font-body  px-8 py-8 w-2/3">
                    <h1 className="tracking-tight text-2xl my-3 text-primary  font-semibold">
                        Create New Post
                    </h1>
                    <Field 
                        name="title"
                        type="text"
                        className="my-4 p-5 outline-primary w-full resize-none rounded-lg shadow-lg"
                        placeholder="Title"
                    />
                    <Field
                        as="textarea"
                        rows={5}

                        name="content"
                        type="text"
                        className="my-4 p-5 outline-primary w-full resize-none rounded-lg shadow-lg"
                        placeholder="Message"
                    />
                    <div className="w-full">
                    <button 
                        className="bg-primary px-5 rounded-md text-white font-bold shadow-lg py-3 transition-all hover:bg-white hover:text-primary hover:outline-primary"
                        disabled={Disabled}
                        style={{
                            opacity: Disabled ? 0.5 : 1,
                        }}
                    >
                        Create
                    </button>
                    </div>
                </Form>
            </Formik>
            <ToastContainer />
        </div>
    )
}

export default Post

export async function getServerSideProps(context) {
    const URL = process.env.API;
  
    return {
      props: {
        URL,
      },
    }
  }