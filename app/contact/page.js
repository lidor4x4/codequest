'use client'

import React, {useState} from 'react'
import HomePageNav from '../HomePageNav'
import { Button, Label, TextInput, Textarea, Alert } from 'flowbite-react';
import emailjs from 'emailjs-com';
import Link from 'next/link';
import { config } from 'dotenv';
config();

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');


  const sendMessage = (e) => {
    e.preventDefault();
    emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        name,
        email,
        title,
        message
      },
      process.env.EMAILJS_USER_ID,
    ).then((result) => {
      setResult('Email sent successfully!')
    }
    ).catch((error) => {
      console.log(error.text);
      setResult(error.text)

    }
    )
    
  }

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
                <Alert className={`${result.length === 0 ? 'hidden' : 'block'} `} >{result}, <Link href='/' className='underline'>Go Back</Link></Alert>
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
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Your Email"
          />
        </div>
        <TextInput
          id="email"
          required
          type="email"
          placeholder='Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
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
          onChange={(e) => setTitle(e.target.value)}
        />
            </div>
            
        <div>
          
        <div className="mb-2 block">
          <Label
            htmlFor="message"
            value="Message"
          />
        </div>
        <Textarea
          id="message"
          sizing="lg"
          type="text"
          placeholder='Message'
          cols={50}
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" onClick={sendMessage}>
        Submit
      </Button>
    </form>
        </div>
    </div>
  )
}
