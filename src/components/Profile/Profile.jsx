import { Avatar, Button, Container, VStack, useDisclosure, Input, Image, Modal, ModalBody, ModalCloseButton, ModalFooter, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile'
import { cancelSubscription, loadUser } from '../../redux/actions/user'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const profile = ({ user }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.profile)
    const { loading: subscriptionLoading, message: subscriptionMessage, error: subscriptionError } = useSelector(state => state.subscription)

    const removeFromPlayListHandler = async (id) => {
        console.log(id);
        await dispatch(removeFromPlaylist(id));
        dispatch(loadUser());
    }

    const changeImageSubmitHandler = async (e, image) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('file', image);
        await dispatch(updateProfilePicture(myForm));
        dispatch(loadUser());
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
        if (subscriptionMessage) {
            toast.success(subscriptionMessage);
            dispatch({ type: 'clearMessage' });
            dispatch(loadUser());
        }

        if (subscriptionError) {
            toast.error(subscriptionError);
            dispatch({ type: 'clearError' });
        }
    }, [dispatch, error, message, subscriptionError, subscriptionMessage]);

    const cancelSubscriptionHandler = () => {
        dispatch(cancelSubscription());
    }

    return (
        <div className='h-fit sm:max-w-[720px] py-8 max-w-[85%]  mx-auto'>
            <h1 className='font-[700] text-[34px] uppercase sm:text-start text-center'>Profile</h1>
            <div className='flex sm:gap-20  sm:flex-row flex-col  pt-10 sm:px-10'>
                <div className='flex gap-4 sm:mx-0 mx-auto flex-col'>
                    <Avatar size={{ base: '2xl', sm: "2xl" }} src={user.avatar.url} />
                    <Button
                        _hover={{
                            backgroundColor: "orange.400"
                        }}
                        isLoading={loading}
                        onClick={onOpen}
                        variant={'ghost'}
                        bgColor="orange.300"
                        textColor={'white'}
                        maxW={"6xl"}
                    >Change Photo</Button>
                </div>
                <div className='sm:pt-0 pt-6'>
                    <h1 className='font-[600] text-[20px]'>Name:  <span className='font-normal text-[18px]'>{user.name}</span> </h1>
                    <h1 className='font-[600] pt-1 text-[20px]'>Email:  <span className='font-normal text-[18px]'>{user.email}</span> </h1>
                    <h1 className='font-[600] pt-1 text-[20px]'>CreatedAt:  <span className='font-normal text-[18px]'>{user.createdAt.split('T')[0]}</span> </h1>
                    <div>
                        {user.role !== 'admin' && (
                            <div className='flex gap-4'>
                                <h1 className='font-[600] pt-1 text-[20px]'>Subscription:</h1>
                                {user.subscription && user.subscription.status === 'active' ? (
                                    <Button
                                        isLoading={subscriptionLoading}
                                        onClick={cancelSubscriptionHandler}
                                        variant={'unstyled'}
                                        textColor={'orange.300'}
                                        maxW={"6xl"}
                                    >Cancel Subscription</Button>
                                ) : (
                                    <Link to="/subscribe">
                                        <Button

                                            variant={'unstyled'}
                                            textColor={'orange.300'}
                                            maxW={"6xl"}
                                        >
                                            Subscribe
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='flex  sm:gap-6 gap-4 sm:pt-0 mt-6 items-center sm:flex-row flex-col'>
                        <Link to="/updateprofile">
                            <Button
                                // pt={}
                                px={'7'}
                            >Update Profile</Button>
                        </Link>

                        <Link to="/changepassword">
                            <Button>Change Password</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='sm:mx-10 mx-auto mb-56 mt-10 font-[600]  text-[25px]'>
                <h1>Playlist</h1>
                {user.playlist.length > 0 && (
                    <div className=''>
                        <div className=' mt-6  flex sm:flex-nowrap flex-wrap gap-12 '>
                            {user.playlist.map((element, index) => {
                                return <div
                                    className='p-5 container1 pt-12 sm:mx-0 mx-auto sm:max-w-[35%]  max-w-[90%] sm:h-[220px] h-[260px]'
                                    key={index}
                                >
                                    <img src={element.poster} alt="no-image" />
                                    <div className='flex mt-1 pl-2 items-center justify-evenly'>
                                        <Link to={`/courses/${element.course}`}>
                                            <Button
                                                variant={'unstyled'}
                                                textColor={'orange.300'}
                                                maxW={"6xl"}
                                            >
                                                Watch Now
                                            </Button>
                                        </Link>
                                        <Button
                                            isLoading={loading}
                                            bgColor={'white'}
                                            onClick={() => removeFromPlayListHandler(element.course)}
                                        >
                                            <RiDeleteBin7Fill className='bg-red' />
                                        </Button>
                                    </div>

                                </div>
                            })}
                        </div>
                    </div>

                )}
            </div>
            <ChangePhotoBox
                changeImageSubmitHandler={changeImageSubmitHandler}
                isOpen={isOpen}
                onClose={onClose}
                loading={loading}
            />

        </div>
    )
}

export default profile

const ChangePhotoBox = ({ isOpen,
    onClose,
    changeImageSubmitHandler, loading }) => {

    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');

    const changeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const closeHandler = () => {
        onClose();
        setImagePrev('');
        setImage('');
    };
    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={'blur(10px)'} />
            <ModalContent>
                <ModalHeader>Change Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container>
                        <form onSubmit={e => changeImageSubmitHandler(e, image)}>
                            <VStack spacing={'8'}>
                                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                                <Input
                                    type={'file'}

                                    onChange={changeImage}
                                />

                                <Button
                                    w="full"
                                    colorScheme={'yellow'}
                                    type="submit"
                                    isLoading={loading}
                                >
                                    Change
                                </Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button mr="3" onClick={closeHandler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}