import React,{useEffect, useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import axios from 'axios';
import { Formik, Field, Form } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useSelector , useDispatch} from 'react-redux'
import { setToken , setUser } from '../../redux/counter/auth';
import { useRouter } from 'next/router'

import {AiOutlineLoading3Quarters} from 'react-icons/ai'

import Link from "next/link";

function Login({URL}) {
  const router = useRouter();

  const [Disabled,setDisabled] = useState(true);

  const [Processing, setProcessing] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  useEffect(() => {
    console.log(state)
  }, [state]);

  return (
    <div className="w-full font-body md:pl-16 flex flex-col h-full">
      <img className="fixed scale-110 -z-50 w-screen h-screen top-0 left-0" src="/assets/bg.svg"/>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}

        validate={values => {
          const errors = {};

          if( values.email === '' || values.password == '' ){
            setDisabled(true);

          }else{
            setDisabled(false);
          }
        }}

        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          setProcessing(true);
          axios.post(`${URL}/auth/login`, values)
          .then(res => {
            // alert(JSON.stringify(res.data));

            dispatch(setToken(res.data.token));
            dispatch(setUser(res.data.user));

            const authstate = {
              token: res.data.token,
              user: res.data.user
            }

            localStorage.setItem('CampusAuth', JSON.stringify(authstate));
            
            toast.success("Login Successful");
            setProcessing(false)
            setTimeout(() => {
              router.push('/')
            }, 1000);
          })
          .catch(err => {
            setProcessing(false)
            toast.error(err.response.data.message);
          });

        }}
      >
      <Form className="md:p-5  pt-20 md:pb-10 rounded-b-lg shadow-2xl shadow-white/20 bg-slate-50 md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-3xl pb-12 font-bold text-primary">
          Sign In
        </h2>
          <label className="flex flex-col my-3 md:mr-5">
            <span className="text-sm  text-gray-800/50">Email Address</span>
            <Field name="email" className="border p-2 rounded-md focus:outline-primary/50"/>
          </label>

          <label className="flex flex-col my-3 md:mr-5">
            <span className="text-sm  text-gray-800/50">Password</span>
            <Field name="password" type="password" className="border p-2 rounded-md focus:outline-primary/50"/>
          </label>
        <hr className="mt-10 w-96"/>
        <button className="mt-6 px-12 py-3 bg-primary text-white font-semibold rounded-full w-48 md:w-auto
       transition-all shadow-lg hover:bg-secondary hover:
        "
        disabled={Disabled}
        style={{
          opacity: Disabled ? 0.5 : 1,
        }}
        > 
          {Processing ? <div className="text-white flex">
            <AiOutlineLoading3Quarters className="self-center mx-1 animate-spin"/>
            <span className="self-center">Processing</span>
          </div> : "Sign In"}
        </button>
        <div className="mt-5">
          <span className="text-sm text-gray-800/50">Don't have an account?</span>
          <Link href="/auth/register">
            <span className="text-primary cursor-pointer text-sm ml-2 font-semibold">Sign Up</span>
          </Link>
        </div>
      </Form>
      </Formik>
      <ToastContainer/>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const URL = process.env.API;

  return {
    props: {
      URL,
    },
  }
}