'use client'

import React from 'react'
import HomePageNav from './HomePageNav'
import { Button } from 'flowbite-react';

export default function Home() {
  return (
    <div className='flex h-screen/svh w-screen flex-col'>
    <HomePageNav />
      <div className='flex justify-center items-center flex-col h-screen '>
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          Welcome to CodeQuest!
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400 w-1/2">
          CodeQuest is an online platform that connects web developers with like-minded individuals to form coding partnerships. It aims to provide a supportive environment where developers can collaborate, learn from each other, and work on coding projects together.
        </p>
        <Button className='mt-4'>
          Get started
        </Button> 
      </div>
    </div>
  )
}
