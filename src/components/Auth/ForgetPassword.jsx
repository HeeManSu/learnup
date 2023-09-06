import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';


const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const { loading, message, error } = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(forgetPassword(email));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    return (
        <div className='flex flex-col justify-center h-screen items-center '>
            <div className='sm:w-[22%] w-[82%]'>
                <form onSubmit={handleSubmit} className="">
                    <h1 className='text-[26px] text-center uppercase font-[700] text-black pb-4'>Forget Password</h1>
                    <Input
                        required
                        id='email'
                        type={'email'}
                        focusBorderColor={'orange.300'}
                        placeholder="Enter your gmail..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        isLoading={loading}
                        type='submit'
                        minW={'full'}
                        mt={'4'}
                        variant={'ghost'}
                        backgroundColor={'orange.300'}
                        textColor={'white'}

                    >
                    

                            Send reset link
                  

                    </Button>
                </form>
            </div>

        </div>
    )
}

export default ForgetPassword