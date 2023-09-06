import React, { useState } from 'react'
import { Input, Button, FormLabel, Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';

export const fileUploadCss = {
    cursor: "pointer",
    marginLeft: "-5%",
    width: "110%",
    border: "none",
    height: "100%",
    color: "#ECC94B",
    backgroundColor: "white",
}

const fileUploadStyle = {
    "&::fileSelectorButton": {
        ...fileUploadCss,
    }
}

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [imgagePrev, setImagePrev] = useState("");
    const [image, setImage] = useState();


    const dispatch = useDispatch();




    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("name", name)
        myForm.append("email", email)
        myForm.append("password", password)
        myForm.append("file", image)
        dispatch(register(myForm))
    }

    return (
        <div className='flex flex-col items-center h-screen gradient1 justify-center max-w-full'>
            <div className='sm:w-[32%] w-[87%] bg-white rounded-3xl sm:py-9 py-4 h-max sm:px-16 px-8 '>
                <h1 className='text-[24px] text-center uppercase font-[700] text-black'>Registration</h1>

                <div className='sm:py-6 py-2 flex justify-center'>
                    <Avatar src={imgagePrev} size={{ base: 'lg', sm: "xl" }} />
                </div>
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
                                type={'text'}
                                placeholder='Enter your email address'
                                focusBorderColor={"orange.200"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Password</h1>
                            <Input
                                required
                                id='password'
                                type={'password'}
                                placeholder='Enter your password'
                                focusBorderColor={"orange.200"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="username"

                            />

                        </div>
                        <div className='flex flex-col gap-2 pb-6'>
                            <h1 className='text-[15px] font-[700]'>Choose avatar</h1>

                            <Input
                                accept='image/*'
                                required
                                id='chooseAvatar'
                                type={'file'}
                                placeholder=''
                                focusBorderColor={"orange.200"}
                                css={{
                                    cursor: "pointer",
                                    marginLeft: "-5%",
                                    width: "110%",
                                    border: "none",
                                    height: "100%",
                                    color: "#ECC94B",
                                    backgroundColor: "white",
                                }}
                                onChange={changeImageHandler}
                            />
                        </div>
                        <Button
                            _hover={{
                                backgroundColor: 'orange.400'
                            }}
                            variant={'ghost'}
                            backgroundColor={'orange.300'}
                            textColor={'white'}
                            onClick={handleSubmit}
                        >Sign Up</Button>

                        <h1 className='text-[14px] text-start pt-4 cursor-pointer font-[600] pb-4' >Already a User? {" "}
                            <Link to="/login"> <span className='text-orange-400  cursor-pointer hover:underline'>Login {" "}</span> </Link>
                            here
                        </h1>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default Register