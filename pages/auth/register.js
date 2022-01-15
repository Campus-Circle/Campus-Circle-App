import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Formik, Field, Form } from "formik";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/counter/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {FcOk} from 'react-icons/fc'
import { useRouter } from "next/router";
import Modal from "react-modal";

import Link from "next/link";

function Login({ URL }) {
  const router = useRouter();

  const [Disabled, setDisabled] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [SignIn, setSignIn] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const HandleClick = () => {
    setModalOpen(!ModalOpen);
  }

  return (
    <div className="w-full font-body md:pl-16 flex flex-col h-full">
      <img
        className="fixed scale-110 -z-50 w-screen h-screen top-0 left-0"
        src="/assets/bg.svg"
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmpassword: "",
          name: "",
          email: "",
          branch: "CSE",
          year: "2020",
        }}
        validate={(values) => {
          const errors = {};

          if (
            values.email === "" ||
            values.password == "" ||
            values.branch === "" ||
            values.year === "" ||
            values.name === "" ||
            values.confirmpassword !== values.password
          ) {
            setSignIn(false);
          } else {
            setDisabled(false);
          }
        }}
        onSubmit={async (values) => {
          setSignIn(true);
          if (values.password !== values.confirmpassword) {
            alert("Passwords do not match");
            setSignIn(false);
            return;
          } else if (values.password.length < 6) {
            alert("Password must be at least 6 characters");
            setSignIn(false);
            return;
          }

          axios
            .post(`${URL}/auth/signup`, {
              branch: values.branch,
              year: values.year,
              name: values.name,
              email: values.email,
              password: values.password,
            })
            .then((res) => {
              toast.success("Successfully Registered");
              HandleClick();
            })
            .catch((err) => {
              toast.error("Error occured");
            });
        }}
      >
        <Form className="md:p-5  pt-20 md:pb-10 rounded-b-lg shadow-2xl shadow-white/20 bg-slate-50 md:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-primary">Register</h2>
          <div className="flex mt-5 flex-wrap flex-col md:flex-row">
            <label className="flex flex-col my-3 md:mr-5">
              <span className="text-sm  text-gray-800/50">Name</span>
              <Field
                id="name"
                name="name"
                className="border p-2 rounded-md focus:outline-primary/50"
              />
            </label>
            <label className="flex flex-col my-3 md:mx-5">
              <span className="text-sm  text-gray-800/50">Email Address</span>
              <Field
                id="email"
                name="email"
                type="email"
                className="border p-2 rounded-md focus:outline-primary/50"
              />
            </label>
          </div>
          <div className="flex md:my-5 md:w-9/12 flex-wrap flex-col md:flex-row">
            <Field
              as="select"
              name="branch"
              className="px-8 rounded-md py-3 outline-none shadow-md shadow-primary/20 bg-primary text-white font-bold"
            >
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="EE">EE</option>
              <option value="ECE">ECE</option>
              <option value="CIVIL">CIVIL</option>
            </Field>
            <Field
              as="select"
              name="year"
              className="ml-32 px-8 rounded-md py-3 outline-none shadow-md shadow-primary/20 bg-primary text-white font-bold"
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </Field>
          </div>
          <div className="flex md:mt-5 flex-wrap flex-col md:flex-row">
            <label className="flex flex-col my-3 md:mr-5">
              <span className="text-sm  text-gray-800/50">Password</span>
              <Field
                id="password"
                name="password"
                type="password"
                className="border p-2 rounded-md focus:outline-primary/50"
              />
            </label>
            <label className="flex flex-col my-3 md:mx-5">
              <span className="text-sm  text-gray-800/50">
                Confirm Password
              </span>
              <Field
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                className="border p-2 rounded-md focus:outline-primary/50"
              />
            </label>
          </div>
          <hr className="mt-10 w-96" />
          <button
            className="mt-6 px-12 py-3 bg-primary text-white font-semibold rounded-full w-48 md:w-auto
       transition-all shadow-lg hover:bg-secondary "
            disabled={Disabled}
            style={{
              opacity: Disabled ? 0.2 : 1,
            }}
          >
            {SignIn == false ? (
              "Sign In"
            ) : (
              <div className="flex">
                <AiOutlineLoading3Quarters className="w-6 h-6 mx-2 animate-spin" />
                <span>Processing</span>
              </div>
            )}
          </button>
          <div className="mt-5">
            <span className="text-sm text-gray-800/50">
              Already have an account?
            </span>
            <Link href="/auth/login">
              <span className="text-primary cursor-pointer text-sm ml-2 font-semibold">
                Sign In
              </span>
            </Link>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
      <Modal
        className="bg-white h-screen w-screen md:h-5/6 md:w-5/6 self-center md:mx-auto md:mt-10 m-5 rounded-md outline-none"
        isOpen={ModalOpen}
      >
        <div className="flex flex-col justify-center items-center h-full">

          <div className="flex flex-col justify-center items-center">
              
              <FcOk className="h-72 w-auto" />
              <h1 
                className="text-2xl w-4/6 text-center font-body text-black/50"
              >
                Verification Mail has been sent to your email account. Please check your inbox and verify your account.
              </h1>
          </div>

          <button
            className="mt-6 px-12 py-3 bg-primary text-white font-semibold rounded-full w-48 md:w-auto transition-all shadow-lg hover:bg-secondary "
            onClick={HandleClick}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const URL = process.env.API;

  return {
    props: {
      URL,
    },
  };
}
export default Login;
