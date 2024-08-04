"use client";

import Link from "next/link"
import Image from "next/image"
import { useState,useEffect } from "react"
import {signIn, signOut, useSession, getProviders } from "next-auth/react"
import Provider from "./Provider";

const Nav = () => {
 const {data:session} = useSession();
 const [Providers, setProviders] = useState(null)
 const [toggleDropDown,setToggleDropDown] = useState(false);

  useEffect(()=>{
    const setProvidersfn = async () => {
        const providers = await getProviders()
        setProviders(providers)
    }
    setProvidersfn();
  },[])

  
// alert(Providers)
console.log(session);


  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
    <Link href="/" className="flex flex-center gap-2">
    <Image src='/assets/images/logo.svg' width={30} height={30} 
    className="cursor-pointer object-contain"
    alt="Promptopia Logo" />   
    <p className="logo_text">Promptopia</p>
    </Link>
     <div className="sm:flex hidden">
        {session?.user ? (
            <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button type="button" onClick={signOut}
            className="black_btn">Sign Out</button>
            <Link href="/profile" className="flex gap-2">
            <Image src={session?.user.image} width={30} height={30}
            className="cursor-pointer object-contain rounded-full"
            alt="Profile" />
            </Link>
            </div>
        ): (<>
        {
            Providers && !session?.user &&
            Object.values(Providers).map((Provider)=>(
                <button type="button"
                key={Provider.name}
                onClick={()=>signIn(Provider.id)}
                className="outline_btn"
                >
                  Sign In  
                </button>
            ))
        }
        
        </>) }
     </div>

     {/* Mobile navigation */}
     <div className="sm:hidden flex relative">
       {
            session?.user?
            (
            <div className="flex">
           <Image src={session?.user.image} width={30} height={30}
            className="rounded-full cursor-pointer object-contain"
            alt="Profile"
            onClick={()=>{setToggleDropDown(prev=>!prev)}}
            />

            {
                toggleDropDown && (
                    <div className="dropdown">
                    <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={()=>setToggleDropDown(false)}
                    >
                         My Profile
                    </Link>

                    <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={()=>setToggleDropDown(false)}
                    >
                         Create Prompt
                    </Link>

                    <button
                    type="button"
                    onClick={()=>{
                        setToggleDropDown(false)
                        signOut()
                    }}
                    className="mt-5 w-full black_btn"
                    >
                     Sign Out
                    </button>
                    </div>
                )
            }

            </div>
        )
            :(
            
        <>
       {    Providers && !session?.user &&
            Object.values(Providers).map((Provider)=>(
                <button type="button"
                key={Provider.name}
                onClick={()=>signIn(Provider.id)}
                className="outline_btn"
                >
                  Sign In  
                </button>
            ))
        }
        </>)
    }


     </div>


    </nav>
  )
}

export default Nav