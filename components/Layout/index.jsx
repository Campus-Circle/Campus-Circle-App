import React, { useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function Layout({ children }) {
  const [Close, setClose] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7,ie=edge,chrome=1" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="robots" content="max-image-preview:large" />
        <meta name="handHeldFriendly" content="True" />
        <meta name="mobileOptimized" content="375" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="canonical" href="https://campus-circle-app.vercel.app" />
        <meta name="twitter:card" content="summary" />

        <meta
          name="description"
          content="College Circle is a platform where students can stay updated of everything around Campus."
        />
        <meta
          name="twitter:description"
          content="College Circle is a platform where students can stay updated of everything around Campus."
        />
        <meta
          name="og:description"
          content="College Circle is a platform where students can stay updated of everything around Campus."
        />
        <meta name="og:url" content="https://campus-circle-app.vercel.app/" />

        <link rel="icon" href="/assets/CampusCircle.svg" type="image/x-icon" />
        <link
          rel="shortcut icon"
          href="/assets/CampusCircle.svg"
          type="image/x-icon"
        />
        <meta
          name="image"
          content="https://campus-circle-app.vercel.app/assets/CampusCircle.svg"
        />
        <meta
          name="og:image"
          content="https://campus-circle-app.vercel.app/assets/CampusCircle.svg"
        />
        <meta
          name="twitter:image"
          content="https://campus-circle-app.vercel.app/assets/CampusCircle.svg"
        />
      </Head>
      <Navbar Close={Close} setClose={setClose} />
      <motion.div
        exit={{
          opacity: 0,
        }}
        className="flex flex-col md:flex-row"
      >
        <motion.div
          className="w-full dark:bg-slate-800"
          animate={{
            paddingLeft: isDesktopOrLaptop ? (Close ? "6rem" : "16rem") : "0",
            marginTop: isDesktopOrLaptop ? "0" : 50,
          }}
          exit={{
            opacity: 0,
          }}
        >
          {children}
        </motion.div>

        <motion.div className="md:hidden flex h-10" />
        <NavbarMobile />
      </motion.div>
    </div>
  );
}

export default Layout;
