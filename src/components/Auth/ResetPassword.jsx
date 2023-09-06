import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from '../../redux/actions/profile';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
    const params = useParams();
    console.log(params)

    const [password, setPassword] = useState('');
    const { loading, error, message } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, password))
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
            navigate("/login");
        }
    }, [dispatch, error, message]);


    return (
        <div className='flex flex-col justify-center h-screen items-center '>
            <div className='sm:w-[22%] w-[82%]'>
                <form onSubmit={handleSubmit} className="">
                    <h1 className='text-[26px] text-center uppercase font-[700] text-black pb-4'>Reset Password</h1>
                    <Input
                        required
                        type={'password'}
                        focusBorderColor={'orange.300'}
                        placeholder="Enter new password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="username"
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
                        Reset password

                    </Button>
                </form>
            </div>

        </div>
    )
}

export default ResetPassword