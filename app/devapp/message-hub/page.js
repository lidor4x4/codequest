'use client'


import React, { useState, useEffect } from 'react';
import NavbarDevApp from '../components/NavbarDevApp';
import { TextInput, Button, Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { firestore } from '@/firebase/config';
import { useAuth } from '@clerk/nextjs';

export default function MessageHub() {
  const [conversations, setConversations] = useState([]);
  const [userID, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState({});

  const { getToken } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    console.log(`${process.env.BASE_URL}/devapp/api/get-user-id`);
    fetch(`https://codequest-6ftym0izd-lidor4x4.vercel.app/devapp/api/get-user-id`)
      .then(res => res.json())
      .then(async data => {
        const userId = data.userId;
        setUserId(userId);

        firestore
          .collection('conversations')
          .where('users', 'array-contains', userId)
          .onSnapshot(snapshot => {
            const conversationsArray = snapshot.docs.map(doc => doc.data());
            setConversations(conversationsArray);
            setLoading(false);
          });
      })
      .catch(err => console.log(err));
  }, []);

  const getUserById = async (ID) => {
    const jwt = await getToken();
    fetch(`${process.env.BASE_URL}/devapp/api/get-user-by-id?userId=${ID}&token=${jwt}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        setUserMap(prevUserMap => ({ ...prevUserMap, [ID]: user }));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    conversations.forEach(conversation => {
      const otherUser = conversation.users.find(user => user !== userID);
      if (otherUser && !userMap[otherUser]) {
        getUserById(otherUser);
      }
    });
  }, [conversations]);


  const GoToConversation = (partnerID) => {
    push(`/devapp/message-hub/conversation/${partnerID}`)
  }

  return (
    <>
      <NavbarDevApp />
      <div>
        {loading ? <h1>Loading...</h1>
          :
          <div className='flex justify-center items-center flex-col gap-4'>
            <h1 className='text-2xl mt-4 font-semibold'>Your conversations</h1>
            <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 mx-4 '>
              {conversations.map((conversation, index) => {
                const otherUser = conversation.users.find(user => user !== userID);
                const partner = userMap[otherUser];
                return (
                  <Card className='flex justify-center items-center flex-col gap-4' key={index}>
                    <h1 className='text-2xl mt-4 font-semibold'>Conversation with {partner ? partner.firstName + ' ' +  partner.lastName : 'Loading...'}</h1>
                    <Button onClick={() => GoToConversation(partner.id)}>Go to conversation</Button>
                  </Card>
                )
              })}
            </div>
          </div>
        }
      </div>
    </>
  );
}
