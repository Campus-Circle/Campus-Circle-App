import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../redux/counter/auth';
import axios from 'axios';
import AppLayout from '../components/Layout/AppLayout';
import PrimaryButton from '../components/UI/Button/Primary';
import { HiLightBulb } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Info from '../components/UI/Alerts/info';
import PropTypes from 'prop-types';

export default function Home({ college, URL }) {
  const TopNav = [
    {
      id: 2,
      name: 'Course',
      src: '/assets/Navbar/Course.svg',
      link: '/course'
    },
    {
      id: 3,
      name: 'Placements',
      src: '/assets/Navbar/Placements.svg',
      link: '/placements'
    },
    {
      id: 4,
      name: 'Events',
      src: '/assets/Navbar/Events.svg',
      link: '/events'
    }
  ];

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` }
    };

    axios
      .post(
        `${URL}/validate`,
        {
          key: 'value'
        },
        config
      )
      .then(() => {
        dispatch(setAuth(true));
      })
      .catch((err) => {
        if (err.response != undefined) {
          console.log(err.response.data);
        }
      });
  }, [auth]);

  return (
    <AppLayout>
      <div className="flex flex-col p-4 md:pl-16 md:pt-20 min-h-screen py-2 transition-all font-body">
        <Head>
          <title>{`Campus Circle - ${college}`}</title>
          <meta name="og:title" content={`Campus Circle - ${college}`} />
          <meta name="twitter:title" content={`Campus Circle - ${college}`} />
        </Head>
        <div className="flex" id="welcometocampuscircle">
          <div className="md:w-2/3 flex-grow">
            <h1 className="text-3xl mt-6 md:text-3xl font-extralight tracking-tight dark:text-white">
              Welcome to Campus Circle
            </h1>
            <h3 className="text-white text-sm bg-primary inline-block p-1 rounded-full font-normal px-5 my-2">
              {college}
            </h3>
            <p className=" text-lg md:text-md mt-5 text-gray-400 md:leading-5">
              College Circle is a platform where students can stay updated of everything around
              Campus.
            </p>
            <p className="text-lg md:text-xl mt-5 text-gray-400 leading-10">Stay Updated to</p>
            <ul className="border-l-2 pl-5 my-4">
              {TopNav.map((item) => {
                return (
                  <Link key={item.id} href={item.link}>
                    <li className="text-lg md:text-md text-primary dark:text-white font-light md:my-1 hover:pl-2 transition-all cursor-pointer">
                      {item.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="hidden lg:block w-1/3">
            <img
              className="pt-5 ml-28 w-2/4 dark:bg-white p-3 rounded-md"
              src="/assets/Home/HomeIcon.svg"
            />
          </div>
        </div>
        <div className="mt-10" id="contribute">
          <PrimaryButton
            onClick={() => {
              window.location.href = 'https://github.com/Campus-Circle';
            }}>
            <span className="self-center text-xl text-white font-medium">Contribute on</span>
            <img className="ml-3 w-8 self-center" src="/assets/Socials/GitHubWhite.svg" />
          </PrimaryButton>
        </div>

        <div className="mt-5">
          <Info
            title="Looking for Maintainers!"
            buttonText="Apply Now"
            onButtonClick={() => {
              window.open('https://forms.gle/w39aexbFa6D54DCb6', '_blank');
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
}

Home.propTypes = {
  college: PropTypes.string.isRequired,
  URL: PropTypes.string.isRequired
};

export async function getStaticProps() {
  const college = process.env.COLLEGE;
  const URL = process.env.API;

  console.log(college);

  return {
    props: {
      college: college,
      URL: URL
    },
    revalidate: 20 // revalidation of the static data after 20 seconds
  };
}
