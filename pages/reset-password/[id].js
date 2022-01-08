import React, { useEffect, useState } from "react";

import axios from "axios";
import { Formik, Field, Form } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

import Loading from "../../components/Loading";

function ResetPassword({ id, URL }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [Disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    try {
      const res = await axios.post(
        `${URL}/auth/validateResetToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        }
      );

      if (res.data.status == 1) {
        setIsValidToken(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);

      alert(error);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="w-full h-screen">
        <div className="flex justify-center items-center flex-col">
          <img src="/assets/Error/Cheems.png" />
          <h1 className="font-bold text-3xl">Invalid Link</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-body w-full flex-col  justify-center items-center">
      <h1 className="text-xl font-semibold text-primary">Change Password</h1>

      <Formik
        initialValues={{
          newpass: "",
          confirmpass: "",
        }}

        validate={(values) => {
            if(values.confirmpass != values.newpass){
                setDisabled(true);
            }else{
                setDisabled(false);
            }
        }}

        onSubmit={async (values) => {
            try{
                const res = await axios.post(`${URL}/auth/reset-password`, {
                    password: values.newpass,
                },{
                    headers: {
                        Authorization: `Bearer ${id}`,
                    }
                });

                if(res.data.status == 1){
                    toast.success("Password Changed Successfully");
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 1000);
                }else{
                    toast.error("Something went wrong");
                }

            } catch (err) {
                console.log(err.response.data);
                toast.error("Error Changing Password");
            }
        }}

      >
        <Form
            className="flex flex-col items-center justify-center w-full"
        >
          <Field
            type="password"
            name="newpass"
            placeholder="New Password"
            className="my-2 mt-7 border p-2 rounded-md w-72 focus:outline-primary/50"
          />
          <Field
            type="password"
            name="confirmpass"
            placeholder="Confirm Password"
            className="my-2 border p-2 rounded-md w-72 focus:outline-primary/50"
          />

          <button 
            type="submit"

            className="bg-primary px-5 rounded-md text-white font-bold shadow-lg py-3 transition-all hover:bg-white hover:text-primary hover:outline-primary mt-4"

            disabled={Disabled}
            style={{
                opacity: Disabled ? 0.5 : 1,
            }}
          >
              Reset Password
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const URL = process.env.API;

  return {
    props: {
      id: id,
      URL: URL,
    },
  };
}
