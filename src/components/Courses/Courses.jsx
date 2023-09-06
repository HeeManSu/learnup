import React, { useState } from 'react'
import { Button, Input, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from "../../redux/actions/user"

const Course = ({ loading, views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount }) => {
    return (
        <div className='container my-8 hover:cursor-pointer gap-4 flex flex-col max-w-[300px] p-5 '>
            <img src={imageSrc} alt="no-image" className='w-[240px] mx-auto h-[135px]' />
            <h1 className='pt-6 text-center font-[600] text-[18px]'>{title}</h1>
            <p>{description}</p>
            <h1> <span className='font-[600] text-[16px]'>Creator:</span> &nbsp; &nbsp;  {creator}</h1>
            <h1> <span className='font-[600] text-[16px]' >Lectures: </span> &nbsp; &nbsp; {lectureCount}</h1>
            <h1> <span className='font-[600] text-[16px]' >Views: </span> &nbsp; &nbsp; {views}</h1>
            
            <div className='flex justify-between'>
                <Link to={`/courses/${id}`} >
                    <Button
                        isLoading={loading}
                        textColor={'white'}
                        backgroundColor={'orange.300'}
                        _hover={{
                            backgroundColor: 'orange.400',
                        }}
                    >
                        Watch Now</Button>
                </Link>
                <Button
                    _hover={{
                        backgroundColor: 'transparent',
                    }}
                    variant={'ghost'}
                    textColor={'orange.300'}
                    backgroundColor={'transparent'}
                    onClick={() => addToPlaylistHandler(id)}
                >
                    Add to playlist
                </Button>
            </div>
        </div>
    )
}

const Courses = () => {
    const [category, setCategory] = useState("")
    const [keyword, setKeyword] = useState("");

    const addToPlaylistHandler = async (courseId) => {
        console.log("Added to playlist", courseId)
        await dispatch(addToPlaylist(courseId));
        dispatch(loadUser());
    }

    const categories = [
        "Android Development",
        "Web Development",
        "Data Science",
        "Blochain Developemnt",
        "Data Struture and Algorithms",
    ];

    const { loading, courses, error, message } = useSelector(state => state.course)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [category, keyword, dispatch, error, message]);

    return (
        <div className='min-h-[90vh]  sm:max-w-[62%] max-w-[95%] mt-10  mx-auto'>
            <h1 className='flex justify-center text-[22px] pb-3'>All Courses</h1>
            <Input
                type={'text'}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                focusBorderColor={"orange.500"}
                placeholder="Seacrh for a course..."
            />
            <div className='py-6 flex gap-3 overflow-x-scroll scrollbar-hidden '>
                {categories.map((item, index) => {
                    return <Button
                        minW={'60'}
                        key={index}
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </Button>
                })}
            </div>
            <div className='flex gap-4 sm:flex-row flex-col flex-wrap sm:justify-evenly justify-center items-center pb-16'>
               
                {courses.length > 0 ? (
                    courses.map(item => (
                        <Course
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            views={item.views}
                            imageSrc={item.poster.url}
                            id={item._id}
                            creator={item.createdBy}
                            lectureCount={item.numOfVideos}
                            addToPlaylistHandler={addToPlaylistHandler}
                            loading={loading}
                        />
                    ))
                ) : (
                    <Heading mt="4" children="Courses Not Found" />
                )}
            </div>
        </div>
    )
}

export default Courses