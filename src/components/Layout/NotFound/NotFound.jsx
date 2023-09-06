import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <div>
        <RiErrorWarningFill className='text-8xl mx-auto' />
        <h1 className='text-[24px] mt-2 font-[700]'>Page Not Found</h1>
        <Link to="/">
          <Button ml={'9'} textColor={'orange'} variant={'ghost'}>Go to home</Button>
        </Link>
      </div>


    </div>
  )
}

export default NotFound