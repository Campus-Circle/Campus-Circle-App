import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";

import { FcOk, FcCancel } from "react-icons/fc";

function VerifyEmail({ URL, id }) {
  const [loading, setLoading] = useState(true);
  const [Verified, setVerified] = useState(false);

  useEffect(async () => {
    try {
      const res = await axios.post(
        `${URL}/auth/verify-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        }
      );

      if (res.data.status == 1) {
        setVerified(true);
      }
      setLoading(false);
    } catch (err) {
        console.log(err.response)
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  if (Verified) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center font-body">
        <FcOk className="w-80 h-auto"/>
        <div className="text-xl my-10">Congratulations! Your Email has been verified.</div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center font-body">
        <img src="/assets/Error/Cheems.png" />
        <div className="font-semibold text-2xl">Sorry! Invalid Url</div>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const URL = process.env.API;
  const { id } = context.query;

  console.log(id)

  return {
    props: {
      id,
      URL,
    },
  };
}

export default VerifyEmail;
