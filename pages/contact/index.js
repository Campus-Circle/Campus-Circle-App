import React from "react";
import Script from "next/script";

import Link from "next/link";

function Index() {

  const Socials = [
    {
      link:"https://github.com/Campus-Circle",
      src: "/assets/Socials/GitHub.svg",
    },
    {
      link:"https://www.instagram.com/jmicampuscircle/",
      src: "/assets/Socials/Instagram.svg",
    },

  ];


  return (
    <div className="w-full  font-body">
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
      <div className="flex p-4 flex-col md:flex-row">
        <div className="md:w-1/2 md:pl-28 md:pt-20">
            <h1 className="font-bold text-2xl pb-2 text">
                Contacts
            </h1>
            <ul>
                {['alamsarfraz422@gmail.com','+91-7303435034'].map((item,index) => {
                    return (
                        <li className="font-medium pl-3 pt-2 text-gray-500">
                            {item}
                        </li>
                    )
                })}
            </ul>
            <h1 className="font-bold text-2xl pb-2 pt-5">Connect with Us</h1>
            <ul className="flex"   >
          {Socials.map((item, index) => {
            return (
              <Link href={item.link}>
              <li className="transition-all">
                <img className="w-16 mr-3" src={item.src} />
              </li>
              </Link>
            );
          })}
        </ul>
        </div>
        <div className="md:w-1/2">
          <iframe
            class="airtable-embed airtable-dynamic-height"
            src="https://airtable.com/embed/shrxTM9zeV7oAp4Rg?backgroundColor=orange"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="756"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Index;
