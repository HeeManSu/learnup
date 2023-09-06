import React, { useState } from 'react'
import { Input, Button, FormLabel, Avatar, Textarea } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const contact = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const {
        loading,
        error,
        message: stateMessage,
    } = useSelector(state => state.other);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(contactUs(name, email, message));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (stateMessage) {
            toast.success(stateMessage);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, stateMessage]);

    return (
        <div className='flex flex-col justify-center h-screen items-center '>
            <div className='sm:w-[22%] w-[82%]'>

                <h1 className='text-[26px] text-center uppercase font-[700] text-black pb-4'>Contact US</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col  '>
                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Name</h1>
                            <Input
                                required
                                id='name'
                                type={'text'}
                                placeholder='Enter your name'
                                focusBorderColor={"orange.200"}
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Email Address</h1>
                            <Input
                                required
                                id='email'
                                type={'email'}
                                placeholder='Enter your email address'
                                focusBorderColor={"orange.200"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Message</h1>
                            <Textarea
                                required
                                type={'text'}
                                placeholder='Enter your message..'
                                focusBorderColor={"orange.200"}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)} />
                        </div>

                        <Button
                            isLoading={loading}
                            type='submit'
                            minW={'full'}
                            variant={'ghost'}
                            backgroundColor={'orange.300'}
                            textColor={'white'}
                            _hover={{
                                backgroundColor: 'orange.400'
                            }}
                        >
                            Send Mail
                        </Button>
                    </div>
                </form>
                <h1 className='text-[14px] text-start pt-4 cursor-pointer font-[600] pb-4' >Request a course? {" "}
                    <Link to="/request"> <span className='text-orange-400  cursor-pointer hover:underline'>Click {" "}</span> </Link>
                    here
                </h1>
            </div>

        </div>
    )

}

export default contact