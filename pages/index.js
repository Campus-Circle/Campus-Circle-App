import Head from "next/head";
import Link from "next/link";

export default function Home({college}) {

  const TopNav = [
    {
      id: 2,
      name: "Course",
      src: "/assets/Navbar/Course.svg",
      link: '/course'
    },
    {
      id: 3,
      name: "Placements",
      src: "/assets/Navbar/Placements.svg",
      link: '/placements'
    },
    {
      id: 4,
      name: "Events",
      src: "/assets/Navbar/Events.svg",
      link: '/events'
    },
  ];


  return (
    <div className="flex flex-col p-4 md:pl-16 md:pt-20 min-h-screen py-2 transition-all font-body">
      <Head>
        <title>{ `Campus Circle - ${college}` }</title>
        <meta name="og:title" content={ `Campus Circle - ${college}` } />
        <meta name="twitter:title" content={ `Campus Circle - ${college}` } />
      </Head>
      <div className="flex" id="welcometocampuscircle">
        <div className="md:w-2/3 flex-grow">
          <h1 className="text-2xl mt-6 md:text-4xl font-medium tracking-tight">
            Welcome to Campus Circle
          </h1>
          <h3 className="text-primary">{college}</h3>
          <p className=" text-lg md:ext-2xl mt-5 text-gray-400 md:leading-10">
            College Circle is a platform where students can stay updated of
            everything around Campus.
          </p>
          <p className="text-lg md:text-2xl mt-5 text-gray-400 leading-10">
            Stay Updated to
          </p>
          <ul className="border-l-2 pl-5 my-4">
            {TopNav.map((item,index) => {
              return(
                <Link key={item.id} href={item.link}>
                  <li className="text-lg md:text-2xl text-primary font-medium md:my-2 hover:pl-2 transition-all cursor-pointer">
                    {item.name}
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
        <div className="hidden lg:block w-1/3">
          <img className="pt-5 ml-28 w-3/4 " src="/assets/Home/HomeIcon.svg"/>
        </div>
      </div>
      <hr className="mt-10 border-dashed border-1" />
      <div className="mt-10" id="contribute">
      <h1 className="text-2xl md:text-4xl font-medium tracking-tight">
            Feel Free to Contribute
          </h1>
          <p className="text-lg md:text-2xl mt-5 text-gray-400 md:leading-10">
            Feel free to contribute by raising an issue or a PR.
          </p> 
          <Link href="https://github.com/Campus-Circle">
          <button className="flex bg-primary p-3 mt-4 rounded-lg shadow-lg hover:bg-secondary hover:shadow-sm transition-all focus:outline-black">
            <span className="self-center text-xl text-white font-medium">
              Contribute on
            </span>
            <img
              className="ml-3 w-12"
             src="/assets/Socials/GitHubWhite.svg"/>
          </button>
          </Link>
      </div>
    </div>
  );
}

export async function getStaticProps(){
  const college = process.env.COLLEGE;

  console.log(college)

  return{
    props:{
      college : college
    }
  }
}
