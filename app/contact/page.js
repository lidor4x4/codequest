'use client'

import React from 'react'
import HomePageNav from '../HomePageNav'
import { Button, Label, TextInput } from 'flowbite-react';


export default function page() {
    return (
      <div>
        <HomePageNav />
      <div className='flex flex-col justify-center items-center'>
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-8">
              Contact Us
          </h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              If you have any questions or concerns, please fill out this form
          </p>
              <form className="flex w-1/4 flex-col gap-4 mt-16">
      <div>
        <div className="mb-2 block ">
          <Label
            htmlFor="name"
            value="Your name"
          />
        </div>
        <TextInput
          id="name"
          placeholder="Name"
          required
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Title"
          />
        </div>
        <TextInput
          id="title"
          required
          type="text"
          placeholder='Title'
        />
            </div>
        <div>
        <div className="mb-2 block">
          <Label
            htmlFor="message"
            value="Message"
          />
        </div>
        <TextInput
          id="message"
          sizing="lg"
          type="text"
          placeholder='Message'
        />
      </div>

      <Button type="submit">
        Submit
      </Button>
    </form>
        </div>
    </div>
  )
}
