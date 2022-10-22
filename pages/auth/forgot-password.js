import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

function ForgotPassword({ URL }) {
  const router = useRouter();

  return (
    <div className="flex-grow h-screen flex flex-col font-body justify-center items-center text-center">
      <h1 className="font-bold text-xl text-primary">Forgot Password</h1>

      <Formik
        initialValues={{
          email: ''
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
          try {
            const res = await axios.post(`${URL}/auth/forgot-password`, values);
            console.log(res.data);
            if (res.data.status == 1)
              toast.success(
                "Reset Link Sent Successfully, Please Check Your Email (Don't forget to check your spam folder)"
              );
            // setTimeout(() => {
            //     router.push('/');
            // }, 2000);
          } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
          }
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <Field
            placeholder="Enter Email Address"
            name="email"
            className="my-6 border p-2 rounded-md w-72 focus:outline-primary/50"
          />

          <button
            type="submit"
            className="bg-primary px-5 rounded-md text-white font-bold shadow-lg py-3 transition-all hover:bg-white hover:text-primary hover:outline-primary"
          >
            Get Reset Link
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const URL = process.env.API;

  return {
    props: {
      URL
    }
  };
}

export default ForgotPassword;
