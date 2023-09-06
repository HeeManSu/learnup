import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';


const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');

  return (
    <div> <div className='h-screen w-full flex flex-col'>
      <div className='mx-auto mt-36'>
        <h1 className='text-[32px] font-[600] text-black'>Welcome</h1>
      </div>
      <div className='container1 mt-7 sm:w-[25%] w-[85%] h-fit flex flex-col  mx-auto'>
        <div className='rounded-t-lg py-5 pl-5 font-[600] gradient1'>Payment Success</div>
        <div className='flex justify-center flex-col px-8 text-[16px] pt-7 text-center'>
          <p>
            Congratulation you're a pro member. You have access to premium
            content.
          </p>

          <RiCheckboxCircleFill className='text-7xl my-7 mx-auto' />
          <Link to="/profile">
            <Button variant={'ghost'}>Go to profile</Button>
          </Link>
          <p className='pb-7 '>Reference: {reference}</p>
        </div>


      </div>
    </div></div>
  )
}

export default PaymentSuccess