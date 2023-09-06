import { Button } from '@chakra-ui/react'
import React from 'react'
import headerimg from '../../assets/images/img.png'
import { useNavigate } from 'react-router-dom';
import image2 from "../../assets/images/image2.png"
import image3 from "../../assets/images/image3.png"
import image4 from "../../assets/images/image4.png"
import request from "../../assets/images/request.png"

const home = () => {

    const navigation = useNavigate();
    const exploreHandler = () => {
        navigation("/courses")
    }

    const requestHandler = () => {
        navigation("/request")
    }

    
    return (
        <div className=''>
            <div className='flex bg-[#edecff] items-center p-5 sm:px-20 sm:flex-row flex-col gap-4 sm:justify-between'>
                <div className='text-xl  font-[600]  sm:pl-24 mt-3 '>
                    <h1 className='text-center'>How about "Empower <span className='text-[#FB9C46]'>Your Future</span>  with  Our <br /> Comprehensive Course Collection"?</h1>
                    <h1 className='text-lg pt-4 text-center'>Learn with the best online courses</h1>
                    <Button
                        ml='24'
                        onClick={exploreHandler}
                        mt='4'
                        size='lg'
                        backgroundColor='green.500'
                        textColor='white'
                        textAlign='center'
                        _hover={{
                            backgroundColor: 'green.500'
                        }}
                    >
                        Explore Now
                    </Button>
                </div>
                <div className='bg-center bg-cover px-4'>
                    <img height={700} width={400} src={headerimg} alt="" />
                </div>
            </div>
            <div className='flex flex-col p-5 items-center'>
                <h1 className='text-[32px] '>Why LearnUp?</h1>
                <div className='mt-7 flex sm:flex-row flex-wrap flex-col gap-5'>
                    <div className='container pt-12 px-12 h-[328px] w-[350px]'>
                        <img className='' src={image2} />
                        <div>
                            <h1 className='text-start text-[18px] font-[500] pt-8'>Lifetime access</h1>
                            <div className='w-20 h-[3px] mt-4 bg-red-500'></div>
                            <h1 className='text-gray-400 pt-4'>
                                The gradual accumulation of
                                information about atomic and
                                small-scale behaviour...
                            </h1>
                        </div>
                    </div>
                    <div className='container pt-12 px-12 h-[328px] w-[350px]'>
                        <img src={image3} />
                        <div>
                            <h1 className='text-start text-[18px] font-[500] pt-8'>Certified Teacher</h1>
                            <div className='w-20 h-[3px] mt-4 bg-red-500'></div>
                            <h1 className='text-gray-400 pt-4'>
                                The gradual accumulation of
                                information about atomic and
                                small-scale behaviour...
                            </h1>
                        </div>
                    </div>
                    <div className='container pt-12 px-12 h-[328px] w-[350px]'>
                        <img src={image4} />
                        <div>
                            <h1 className='text-start text-[18px] font-[500] pt-8'>training Courses</h1>
                            <div className='w-20 h-[3px] mt-4 bg-red-500'></div>
                            <h1 className='text-gray-400 pt-4'>
                                The gradual accumulation of
                                information about atomic and
                                small-scale behaviour...
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:h-[350px] h-full sm:w-[70%] w-[90%] sm:px-16 px-8 sm:py-16 py-8 border-2 rounded-xl mx-auto mt-14 mb-20 bg-[#F1E4FF]'>
                <div className='flex justify-around  flex-wrap '>
                    <div className='sm:text-start text-center'>
                        <h1 className='font-bold sm:text-[35px] text-[24px] w-[260px] sm:w-[400px] '>Have a project idea? let's come together to build something great</h1>
                        <Button
                            onClick={requestHandler}
                            mt={'8'}
                            type='submit'
                            variant={'ghost'}
                            backgroundColor={'orange.300'}
                            textColor={'white'}
                            _hover={{
                                backgroundColor: 'orange.400'
                            }}
                        >
                            Request a course
                        </Button>
                    </div>
                    <div>
                        <img className='relative bottom-24 sm:pt-0 pt-16 lg:block hidden' width="350px" height="400px" src={request} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home