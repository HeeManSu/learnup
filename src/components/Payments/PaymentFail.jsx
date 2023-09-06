import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const PaymentFail = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <div>
        <RiErrorWarningFill className='text-6xl mx-auto' />
        <h1 className='text-[24px] mt-2 font-[700]'>Payment Fail</h1>
        <Link to="/subscribe">
          <Button ml={'5'} textColor={'orange'} variant={'ghost'}>Try Again</Button>
        </Link>
      </div>

    </div>
  )
}

export default PaymentFail