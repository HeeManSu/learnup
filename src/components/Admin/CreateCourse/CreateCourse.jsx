import React, { useState, useEffect } from 'react'
import { Input, Button, Image, Select } from '@chakra-ui/react'
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const CreateCourse = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [imagePrev, setImagePrev] = useState("");

    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.admin);


    const categories = [
        "Android Development",
        "Web Development",
        "Data Science",
        "Blochain Developemnt",
        "Data Struture and Algorithms",
    ]

    const changeImageHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("category", category);
        myForm.append("createdBy", createdBy);
        myForm.append("file", image);
        dispatch(createCourse(myForm));
    }

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

        <div className='flex h-full sm:flex-row flex-col  sm:justify-between'>

            <form onSubmit={onSubmitHandler} className='flex py-28 flex-col gap-5 sm:w-[23%] w-[80%] mx-auto '>
                <h1 className='text-[24px] text-center uppercase pb-8 font-[700] text-black'>Create Course</h1>
                <Input
                    required
                    id='Title'
                    type={'text'}
                    placeholder='Title'
                    focusBorderColor={"orange.200"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    required
                    id='description'
                    type={'text'}
                    placeholder='Description'
                    focusBorderColor={"orange.200"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                    required
                    id='name'
                    type={'text'}
                    placeholder='Creater Name'
                    focusBorderColor={"orange.200"}
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                />

                <Select
                    focusBorderColor={"orange.200"}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value={""}>Catergory</option>

                    {categories.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}

                </Select>
                <Input
                    accept="image/*"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    onChange={changeImageHandler}
                />

                {imagePrev && (
                    <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
                )}
                <Button
                    isLoading={loading}
                    w="full"
                    colorScheme={'orange'}
                    type="submit"
                >
                    Create
                </Button>


            </form>


            <div className='sm:w-[20%]  w-[80%] sm:mx-0 mx-auto flex justify-center sm:h-auto container1 '>
                <Sidebar />
            </div>
        </div>
    )
}

export default CreateCourse