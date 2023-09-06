import React, { useState } from 'react'
import { Input, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }


    return (
        <div className='flex flex-col items-center h-screen gradient1 justify-center max-w-full '>
            <div className='sm:w-[28%] w-[85%]  bg-white rounded-3xl h-max sm:px-16 px-8 sm:py-16 py-8'>
                <h1 className='text-[24px] text-center font-[700] text-black'>Welcome to LearnUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col sm:pt-14 pt-10'>
                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Email Address</h1>
                            <Input
                                required
                                id='email'
                                name='email'
                                type={'text'}
                                placeholder='Enter your email address'
                                focusBorderColor={"orange.200"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Password</h1>
                            <Input
                                required
                                id='password'
                                name='password'
                                type={'password'}
                                placeholder='Enter your password'
                                focusBorderColor={"orange.200"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="username"

                            />

                        </div>



                        <Link to="/forgetpassword">
                            <h1 className='text-[14px] cursor-pointer font-[600] pb-4' >Forget Password?
                            </h1>
                        </Link>

                        <Button
                            _hover={{
                                backgroundColor: "orange.400"
                            }}
                            variant={'ghost'}
                            backgroundColor={'orange.300'}
                            textColor={'white'}
                            type='submit'
                        >Login</Button>

                        <h1 className='text-[14px] text-start pt-4 cursor-pointer font-[600] pb-4' >New User? {" "}
                            <Link to="/register"> <span className='text-orange-400  cursor-pointer hover:underline'>Sign Up {" "}</span> </Link>
                            here
                        </h1>
                    </div>
                </form>
            </div>

            <div className='absolute left-24 sm:top-32 top-9 '>
                Dummy email and password to see dashboard and user <br />
                email: admin2023@gmail.com  <br />
                password: password <br />
                email: userwithsub2023@gmail.com <br />
                password: password <br />
            </div>

        </div >
    )
}

export default Login