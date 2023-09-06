import React, { useState } from 'react'
import { Input, Button, Textarea } from '@chakra-ui/react'
import { changePassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(changePassword(oldPassword, newPassword));
    };

    const { loading, message, error } = useSelector(state => state.profile);

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

                <h1 className='text-[24px] uppercase text-center  font-[700] text-black pb-4'>Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-4 flex-col  '>
                        <Input
                            required
                            placeholder='Old Password'
                            value={oldPassword}
                            type={"password"}
                            autoComplete="username"
                            focusBorderColor={"orange.200"}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Input
                            required
                            placeholder='New Password'
                            value={newPassword}
                            type={"password"}
                            autoComplete="username"
                            focusBorderColor={"orange.200"}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />



                        <Button
                            _hover={{
                                backgroundColor: 'orange.400'
                            }}
                            isLoading={loading}
                            type='submit'
                            minW={'full'}
                            onClick={handleSubmit}
                            variant={'ghost'}
                            backgroundColor={'orange.300'}
                            textColor={'white'}
                        >
                            Change
                        </Button>
                    </div>
                </form>

            </div >

        </div >
    )
}

export default ChangePassword