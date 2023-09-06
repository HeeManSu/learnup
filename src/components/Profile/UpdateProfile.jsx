import React, { useState } from 'react'
import { Input, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';



const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email))
        dispatch(loadUser());
        navigate("/profile")
    }

    const {loading} = useSelector(state => state.profile)

    return (
        <div className='flex flex-col justify-center h-screen items-center '>
            <div className='sm:w-[22%] w-[82%]'>

                <h1 className='text-[24px] uppercase text-center  font-[700] text-black pb-4'>Update Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-4 flex-col  '>
                        <Input
                            required
                            placeholder='New Name'
                            value={name}
                            type={"text"}
                            focusBorderColor={"orange.200"}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            required
                            placeholder='New Email'
                            value={email}
                            type={"email"}
                            focusBorderColor={"orange.200"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                        _hover={{
                            backgroundColor: "orange.400"
                        }}
                            type='submit'
                            minW={'full'}
                            isLoading={loading}
                            variant={'ghost'}
                            backgroundColor={'orange.300'}
                            textColor={'white'}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile