// import React from 'react'
import { Button } from './ui/button'

import { usePrivy } from '@privy-io/react-auth';
// import { World } from './components/ui/globe';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import NavbarHeader from './navbar-header';
import { Link } from 'wouter';

export default function Header() {
    const {ready, authenticated, login} = usePrivy();
    const disableLogin = !ready || (ready && authenticated);
  return (
    <div className='py-2 px-4 w-full flex justify-between items-center'>
    <Avatar className='h-16 w-16'>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    {/* <NavbarHeader/> */}
    <div className="flex justify-between text-xl font-semibold space-x-8 items-center ">
      <Link href="/meme" className='border-b-2 p-2 hover:border-orange-500 hover:text-orange-500 ' >
      Explore Meme
      </Link>
      <Link href="/meme" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500 ">
      Registered Tokens
      </Link>
    </div>
         <Button  disabled={disableLogin} onClick={login}> Login </Button>
         
        </div>
  )
}
