import React from 'react';
import Script from 'next/script';
import Link from 'next/link';
import Head from 'next/head';

function Index() {
  const Socials = [
    {
      link: 'https://github.com/Campus-Circle',
      src: '/assets/Socials/GitHub.svg'
    },
    {
      link: 'https://www.instagram.com/jmicampuscircle/',
      src: '/assets/Socials/Instagram.svg'
    }
  ];

  return (
    <div className="w-full  font-body">
      <Head>
        <title>{`Contact Us`}</title>
        <meta name="og:title" content={`Contact Us`} />
        <meta name="twitter:title" content={`Contact Us`} />
      </Head>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
      <div className="flex p-4 flex-col md:flex-row">
        <div className="md:w-1/2 md:pl-28 md:pt-20">
          <h1 className="font-bold text-2xl pb-2 text">Contacts</h1>
          <ul>
            {['alamsarfraz422@gmail.com', '+91-7303435034'].map((item) => {
              return (
                <li key={item} className="font-medium pl-3 pt-2 text-gray-500">
                  {item}
                </li>
              );
            })}
          </ul>
          <h1 className="font-bold text-2xl pb-2 pt-5">Connect with Us</h1>
          <ul className="flex">
            {Socials.map((item) => {
              return (
                <Link key={item.link} href={item.link}>
                  <li className="transition-all">
                    <img className="w-16 mr-3" src={item.src} />
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Index;
