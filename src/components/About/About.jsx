import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import termsAndCondition from '../../assets/docs/termsAndCondition'
import { RiSecurePaymentFill } from 'react-icons/ri';
import logo from "../../assets/images/logo4.png"


const Termscon = ({ termsAndCondition }) => {
    return (
        <div className=' pt-10'>
            <h1 className='text-[18px] sm:text-start text-center uppercase font-[700] text-black'> Terms & Conditions</h1>

            <div className=' max-h-[230px] overflow-scroll'>
                {termsAndCondition}
            </div>

        </div>
    )
}


const Founder = () => {
    return (
        <div className='flex sm:flex-row  flex-col sm:justify-between justify-center w-full  pt-7'>
            <div className='pb-4 mx-auto'>
                <Avatar src={logo} boxSize={['28', '36']} />
                <h1 className='text-center'>LearnUp</h1>
            </div>

            <div className='sm:w-[65%] flex flex-col justify-center gap-2'>
                <h1 className='text-[27px] sm:text-start text-center  font-[700] text-black'>LearnUp</h1>
                <p className='text-[17px] sm:text-start text-center'>LearnUp is the ultimate destination for those who want to master programming. Our website offers a diverse range of high-quality courses that cater to everyone, from beginners to experts.  </p>
            </div>
        </div>
    )
}

const About = () => {
    return (
        <div className='container1 sm:w-[60%] w-[85%] h-full flex flex-col mx-auto my-10'>
            <div className='sm:px-14 px-10 py-10 w-full'>
                <h1 className='text-[32px] sm:text-start text-center font-[600] text-black'>About Us</h1>
                <Founder />

                <div className='flex sm:flex-row flex-col sm:mt-9 mt-7 sm:gap-24 sm:px-10'>
                    <p className='text-[16px] sm:text-start text-center pb-4  cursor-pointer font-[600] '>
                        We are a video streaming platform with some premium courses     available only for premium users.
                    </p>
                    <Link to="/subscribe">
                        <Button variant={'solid'}
                            ml={['8', '0']}
                            mt={'3'}
                            backgroundColor={"green.400"}
                            _hover={{
                                backgroundColor: "green.500"
                            }}
                            color={"white"}
                        >
                            Checkout Our Plan
                        </Button>
                    </Link>
                </div>

                <Termscon termsAndCondition={termsAndCondition} />
                <div className='flex pt-8'>
                    <RiSecurePaymentFill className=' sm:text-[1.4rem] text-[1rem]' />
                    <h1 className='sm:text-[14px] text-[12px] sm:text-center text-start uppercase font-[700] text-black'>Payment is secured by Razorpay</h1>
                </div>
            </div>

        </div>
    )
}

export default About