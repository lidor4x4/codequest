'use client'

import React, {useState, useEffect} from 'react'
import Navbar from '../components/NavbarDevApp';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { firestore } from '../../../firebase/config';
import Link from 'next/link';

export default function PostPartnerRequest() {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [created, setCreated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
    fetch(`${process.env.BASE_URL}/devapp/api/get-user-id`)
      .then(res => res.json())
      .then(data => setUserId(data.userId))
      .catch(err => console.log(err));

    }, [])



    const createPartnerRequest = async (e) => {
        e.preventDefault();
        const partnerRequest = {
            name,
            title,
            message,
            userId,
            createdAt: new Date()
        }
        await firestore.collection('partnerRequests').add(partnerRequest);
        setCreated(true);
    }


  return (
    <>
        <Navbar />
        <div className='flex h-screen  items-center flex-col '>
            <h1 className='text-2xl font-semibold mt-4'>Post a partner request</h1>
             <form className="flex w-1/4 flex-col gap-4 mt-16">
              {created ? <Alert color="info"> <span> <p> <span className="font-medium"> Good Job </span> Partner request created <a className='underline'><Link href="/devapp">Go back</Link></a> </p> </span> </Alert> : null }
      <div className=''>
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
        <TextInput
          id="message"
          sizing="lg"
          type="text"
          placeholder='Message'
            onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" onClick={createPartnerRequest}>
        Submit
      </Button>
    </form>

        </div>
    </>
  )
}
