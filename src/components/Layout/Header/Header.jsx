import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { RiMenu5Fill, RiLogoutBoxLine, RiDashboardFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/user'


const LinkButton = ({ url, title, onClose }) => (
    <Link onClick={onClose} to={url}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
)


const Header = ({ isAuthenticated = false, user }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        onclose = { onclose }
        dispatch(logout());
    }

    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme={'yellow'}
                width="12"
                height={'12'}
                rounded="full"
                position={'fixed'}
                top="6"
                left={"6"}>
                <RiMenu5Fill />
            </Button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'} >LearnUp</DrawerHeader>
                    <DrawerBody>
                        <div className='flex gap-3 flex-col '>
                            <LinkButton
                                onClose={onClose}
                                url="/"
                                title="Home"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/courses"
                                title="Browse All Courses"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/request"
                                title="Request a Course"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/contact"
                                title="Contact us"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/about"
                                title="About "
                            />
                            <div className='flex w-[80%] justify-evenly items-center absolute bottom-4'>
                                {isAuthenticated ? (<>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex gap-4 '>
                                            <Link onClick={onClose} to="/profile">

                                                <Button
                                                    _hover={{
                                                        backgroundColor: 'green.500'
                                                    }}
                                                    variant={'ghost'} backgroundColor={'green.400'} textColor={"white"} colorScheme={'yellow'}>Profile</Button>
                                            </Link>
                                            <Button
                                                _hover={{
                                                    backgroundColor: "green.500"
                                                }}
                                                onClick={logoutHandler} variant={'ghost'} backgroundColor={'green.400'} textColor={"white"} colorScheme={'yellow'}>
                                                <RiLogoutBoxLine />
                                                Logout
                                            </Button>
                                        </div>
                                        {user && user.role === 'admin' && (
                                            <Link onClick={onClose} to="/admin/dashboard">
                                                <Button colorScheme={'purple'} variant={'ghost'}>
                                                    <RiDashboardFill style={{ margin: '4px' }} />
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </>) : (
                                    <>
                                        <Link onClick={onClose} to="/login">
                                            <Button
                                                _hover={{
                                                    backgroundColor: 'green.400'
                                                }}
                                                textDecor={"center"} textColor={"white"} backgroundColor={'green.400'} colorScheme={"yellow"}>Login</Button>
                                        </Link>
                                        <p>OR</p>
                                        <Link onClick={onClose} to="/register">
                                            <Button
                                                _hover={{
                                                    backgroundColor: 'green.400'
                                                }}
                                                textColor={"white"} backgroundColor={'green.400'} colorScheme={"yellow"}>Sign Up</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default Header