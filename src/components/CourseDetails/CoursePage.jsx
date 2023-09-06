import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from "../Layout/Loader/Loader"
import { Heading } from '@chakra-ui/react';

const CoursePage = ({ user }) => {

    const [lectureNumber, setLectureNumber] = useState(0);

    const dispatch = useDispatch();
    const params = useParams();
    const { loading, lectures } = useSelector(state => state.course);


    useEffect(() => {
        dispatch(getCourseLectures(params.id))
    }, [dispatch, params.id]);


    if (
        user.role !== 'admin' &&
        (user.subscription === undefined || user.subscription.status !== 'active')
    ) {
        return <Navigate to={'/subscribe'} />;
    }



    return loading ? (
        <Loader />) : (
        <div className='h-fit w-full max-h-[70%] flex mt-5 sm:flex-row  items-center  flex-col justify-center py-10'>
            {lectures && lectures.length > 0 ? (
                <>
                    <div className='sm:w-[50%] w-[85%]'>
                        <video
                            className=' h-[70%]'
                            width={'100%'}
                            controls
                            controlsList='nodownload noremoteplayback'
                            disablePictureInPicture
                            disableRemotePlayback
                            src={lectures[lectureNumber].video.url}
                        />

                        {!loading && lectures.length > 0 && (
                            <div className='mt-5 pl-3'>
                                <p className='font-[700] text-[28px]'>{`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}</p>
                                <p className='pt-2 text-[32px] font-[700]'>Description</p>
                                <p className='pt-2 sm:text-[22px] text-[18px] font-[600]'>{lectures[lectureNumber].description}</p>
                            </div>
                        )}

                    </div>

                    <div className='sm:w-[25%] sm:relative sm:mt-0  mt-5 scrollbar-hidden sm:bottom-20 overflow-scroll max-h-[420px] w-[80%]'>
                        {lectures.map((element, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => setLectureNumber(index)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        textAlign: 'center',
                                        margin: 0,
                                        border: '1px solid rgba(0,0,0,0.2)',
                                    }}
                                >

                                    <p>#{index + 1} {element.title}</p>
                                </button>
                            )
                        })}
                    </div>
                </>
            ) : (
                <Heading children="No Lectures" />
            )}

        </div>
    )
}

export default CoursePage