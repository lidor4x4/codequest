import React from 'react'
import { SignIn } from "@clerk/nextjs";
import HomePageNav from '../HomePageNav';
export default function page() {
  return (
    <div className='flex flex-col w-screen h-screen'>
    <HomePageNav />
    <div className='flex h-screen w-screen justify-center items-center flex-col'>
    <SignIn />
  </div>
  </div>
  
  )
}
