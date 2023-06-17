'use client';

import { Button, Navbar } from 'flowbite-react';
import React from 'react';
import { useRouter } from 'next/navigation'

export default function HomePageNav() {
    const router = useRouter()
  const {push} = router
  
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          CodeQuest
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={() => push('/devapp')}>
          Get started
        </Button>
        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


