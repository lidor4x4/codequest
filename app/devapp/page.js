'use client'

import React, {useState, useEffect} from 'react'
import Navbar from './components/NavbarDevApp';
import { Alert, Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { firestore } from '../../firebase/config';
import { useRouter } from 'next/navigation';

export default function DevappHome() {

    const [partnerRequests, setPartnerRequests] = useState();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [partnerId, setPartnerId] = useState(null);
    const [error, setError] = useState('');
    const { push } = useRouter();




    useEffect(() => {
      async function getAllPartnerRequests() {
        // fetch the user id from /api/get-user-id
        fetch(`${process.env.BASE_URL}/devapp/api/get-user-id`)
          .then(res => res.json())
          .then(data => setUserId(data.userId))
          .catch(err => console.log(err));

        // get all partner requests
        const partnerRequests = await firestore.collection('partnerRequests').get();
        let partnerRequestsArray = partnerRequests.docs.map(doc => doc.data());
        // sort the array by date
        partnerRequestsArray.sort((a, b) => b.createdAt - a.createdAt);
        // remove requests that have been posted by the user
        console.log(partnerRequestsArray, userId, partnerRequestsArray.filter(partnerRequest => partnerRequest.userId !== userId));
        partnerRequestsArray = partnerRequestsArray.filter(partnerRequest => partnerRequest.userId !== userId);

        setPartnerRequests(partnerRequestsArray);
        setLoading(false)
        console.log(partnerRequests);
      }
      getAllPartnerRequests();
    }, [userId]);
    


    const createConversation = async (partnerName) => {
      //  check if the conversation already exists between the two users
      const conversationSnapshot = await firestore.collection('conversations')
      conversationSnapshot.where('users', 'array-contains', userId)
      conversationSnapshot.where('users', 'array-contains', partnerRequests.find(partnerRequest => partnerRequest.name === partnerName).userId)
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.empty) {
          // create the conversation
                const conversation = {
        createdAt: new Date(),
        messages: [],
        users: [userId, partnerRequests.find(partnerRequest => partnerRequest.name === partnerName).userId]
      }
        await firestore.collection('conversations').add(conversation);
        console.log('conversation created');
        // redirect to the conversation page
        push(`/devapp/message-hub/conversation/${partnerRequests.find(partnerRequest => partnerRequest.name === partnerName).userId}`);
      
        } else {
          setError('You already have a conversation with this user');
        }
      })


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
                        <Alert className={`${error.length === 0 ? 'hidden' : 'block'}`} >{error}, you can find it <Link className='underline' href={`/devapp/message-hub/conversation/${partnerRequest.userId}`}>Here</Link> </Alert>
                        <h1 className='text-xl font-semibold dark:text-white'>{partnerRequest.title}</h1>
                        <p className='text-md font-medium'>{partnerRequest.message}</p>
                        <p className='text-md font-medium'>Posted by: {partnerRequest.name}</p>
                        <Button  onClick={() => {
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
