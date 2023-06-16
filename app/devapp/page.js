'use client'

import React, {useState, useEffect} from 'react'
import Navbar from './components/NavbarDevApp';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { firestore } from '@/firebase/config';

export default function DevappHome() {

    const [partnerRequests, setPartnerRequests] = useState();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [partnerId, setPartnerId] = useState(null);


    const getAllPartnerRequests = async () => {
        const partnerRequests = await firestore.collection('partnerRequests').get();
        const partnerRequestsArray = partnerRequests.docs.map(doc => doc.data());
        // sort the array by date
        partnerRequestsArray.sort((a, b) => b.createdAt - a.createdAt);
        setPartnerRequests(partnerRequestsArray);
        setLoading(false);
    }

    useEffect(() => {
      getAllPartnerRequests();
      // fetch the user id from /api/get-user-id
      fetch('http://localhost:3000/devapp/api/get-user-id')
      .then(res => res.json())
      .then(data => setUserId(data.userId))
      .catch(err => console.log(err));
      console.log(partnerRequests);
    }, [])
    


    const createConversation = async (partnerName) => {
      const conversation = {
        createdAt: new Date(),
        messagesUser1: [],
        messagesUser2: [],
        users: [userId, partnerRequests.find(partnerRequest => partnerRequest.name === partnerName).userId]
      }
      await firestore.collection('conversations').add(conversation);
    }


  return (
    <>
      <Navbar />
      {loading ? <h1>Loading...</h1> : 
      <div className='flex justify-center flex-col gap-4'>
        <div className='flex justify-center items-center flex-col gap-4'>
        <h1 className='text-2xl mt-4 font-semibold'>Do you need a partner for your project?</h1>
        <p className='text-md font-medium'>CodeQuest got you here you can post what your&apos;re looking for and people with these skills will be able to message you</p>
        <Link href="/devapp/post-partner"><Button>Post you own</Button></Link>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 mx-4 '>

                    {partnerRequests.map((partnerRequest, index) => (
                      <Card className='flex flex-col gap-4' key={index}>
                        <h1 className='text-xl font-semibold'>{partnerRequest.title}</h1>
                        <p className='text-md font-medium'>{partnerRequest.message}</p>
                        <p className='text-md font-medium'>Posted by: {partnerRequest.name}</p>
                        <Button onClick={() => {
                          createConversation(partnerRequest.name);
                        }}>Message</Button>
                      </Card>
                    ))}
                  </div>
                </div>
                }
              </>
            )
          }
