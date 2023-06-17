'use client';

import { Button, Navbar } from 'flowbite-react';

export default function HomePageNav() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Code Quest
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>
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


