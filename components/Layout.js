import React,{useState} from 'react'
import Navbar from './Navbar'
import NavbarMobile from "./NavbarMobile"

function Layout({children}) {

    const [Close, setClose] = useState(false);

    return (
        <div>
            <Navbar Close={Close} setClose={setClose}/>
            <div className="flex flex-col md:flex-row">
                <div className="w-96 hidden md:block"
                    style={{
                        width: Close ? "6rem" : null
                    }}
                />

                <div 
                    className="h-16 md:hidden"
                />
                
                <NavbarMobile />
                {children}
            </div>
        </div>
    )
}

export default Layout
