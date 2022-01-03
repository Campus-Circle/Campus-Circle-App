import React,{useState} from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import NavbarMobile from "./NavbarMobile"

function Layout({children}) {

    const [Close, setClose] = useState(false);

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

                <meta name="description" content="College Circle is a platform where students can stay updated of everything around Campus." />
                <meta name="twitter:description" content="College Circle is a platform where students can stay updated of everything around Campus." />
                <meta name="og:description" content="College Circle is a platform where students can stay updated of everything around Campus." />
                <meta name="og:url" content="https://campus-circle-app.vercel.app/" />

                <link rel="icon" href="/assets/CampusCircle.svg" type="image/x-icon" />
                <link rel="shortcut icon" href="/assets/CampusCircle.svg" type="image/x-icon" />
                <meta name="image" content="https://campus-circle-app.vercel.app/assets/CampusCircle.svg" />
                <meta name="og:image" content="https://campus-circle-app.vercel.app/assets/CampusCircle.svg" />
                <meta name="twitter:image" content="https://campus-circle-app.vercel.app/assets/CampusCircle.svg" />
            </Head>
            <Navbar Close={Close} setClose={setClose}/>
            <div className="flex flex-col md:flex-row">
                <div className="w-64 hidden md:block"
                    style={{
                        width: Close ? "6rem" : null
                    }}
                />

                <div className='md:hidden flex h-10'/>

                
                <NavbarMobile />
                {children}
            </div>
        </div>
    )
}

export default Layout
