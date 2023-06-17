/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    BASE_URL: process.env.BASE_URL,
  },
};

