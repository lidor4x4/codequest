'use client';

import { Dropdown, Navbar, Avatar } from 'flowbite-react';
import { UserButton } from "@clerk/nextjs";
import { Moon, Sun } from 'heroicons-react';

export default function NavbarDevApp() {


  return (
    <Navbar
      fluid
      rounded
      className='fixed top-0 left-0 right-0 z-50  dark:bg-gray-800 dark:text-white'
    >
      <Navbar.Brand href="/devapp">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <p >CodeQuest</p>
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <UserButton afterSignOutUrl='/' />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/devapp"
        >
          <p>
            Find  a Partner
          </p>
        </Navbar.Link>
        <Navbar.Link href="/devapp/message-hub">
          Message Hub
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


