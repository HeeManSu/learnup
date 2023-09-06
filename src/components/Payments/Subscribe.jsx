import { Button } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store';
import { buyScription } from '../../redux/actions/user';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import logo from "../../assets/images/logo.png"

const Subscribe = ({ user }) => {


  const dispatch = useDispatch();
  const [key, setKey] = useState();

  const { loading, error, subscriptionId } = useSelector(state => state.subscription)

  const { error: courseError } = useSelector(state => state.course)

  const subscibeHandler = async () => {
    const { data: { key } } = await axios.get(`${server}/razorpaykey`)
    setKey(key);
    dispatch(buyScription());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: "LearnUp",
          Description: "Get access to all premium content",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Himanshu Sharma LearnUp',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
      openPopUp();
    }
  }, [
    dispatch,
    error,
    // courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ])

  return (
    <div className='h-screen w-full flex flex-col'>
      <div className='mx-auto mt-36'>
        <h1 className='text-[32px] font-[600] text-black'>Welcome</h1>
      </div>
      <div className='container1 mt-7 sm:w-[25%] w-[85%] h-fit flex flex-col  mx-auto'>
        <div className='rounded-t-lg py-5 pl-5 font-[600] gradient1'>Pro Pack - ₹799.00</div>
        <div className='flex justify-center flex-col px-16 text-[16px] pt-7 text-center'>
          <p>
            Join pro pack and get access to all content.
          </p>
          <h1 className='text-[22px] pt-7 font-[600] text-black'>₹799 Only</h1>
        </div>
        <Button
          _hover={{
            backgroundColor: 'orange.400'
          }}
          isLoading={loading}
          type='submit'
          minW={'40'}
          mx={'7'}
          mt={'7'}
          onClick={subscibeHandler}
          variant={'ghost'}
          backgroundColor={'orange.300'}
          textColor={'white'}
        >
          Buy Now
        </Button>
        <div className='rounded-b-[8px] mt-10 py-4 pl-5 text-white bg-slate-500'>
          <p className='text-[18px] font-[600]'>100% refund at cancellation</p>
          <p className='text-[16px]  font-[600]'>*Terms & Conditions Apply</p>
        </div>
      </div>
    </div>
  )
}

export default Subscribe