import React from 'react'
import Sidebar from '../Sidebar'
import { Box, Heading, Table, TableCaption, TableContainer, Thead, Tr, Th, Td, Tbody, HStack, Button, useDisclosure } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin'
import { toast } from 'react-hot-toast'

const Users = () => {

    const dispatch = useDispatch();
    const { users, loading, error, message } = useSelector(state => state.admin);

    const updateHandler = (userId) => {
        console.log(userId)
        dispatch(updateUserRole(userId))
    }

    const deleteButtonHandler = (userId) => {
        console.log(userId)
        dispatch(deleteUser(userId))
    }

    // const users = [{
    //     _id: "dfhjkajhfkahjk",
    //     name: "Himanshu",
    //     role: "admin",
    //     email: "Himanshusharma@gmial.com",
    //     subscription: {
    //         status: "active"
    //     },
    // }]

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, message]);


    return (
        <div className='h-screen  w-full'>
            <div className='flex sm:flex-row flex-col'>

                <div className='flex flex-col w-[80%] sm:p-12 p-6'>
                    <Box p={["0", "8"]} overflow={"auto"}>
                        <Heading
                            textTransform={"uppercase"}
                            children="All Users"
                            my="16"
                            textAlign={["center", "left"]}
                        />

                        <TableContainer w={["100vw", "full"]}>
                            <Table variant={"simple"} size={"lg"}>
                                <TableCaption>
                                    All available users in the database
                                </TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Id
                                        </Th>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Role</Th>
                                        <Th>Subscription</Th>
                                        <Th isNumeric>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users &&
                                        users.map(item => (
                                            <Row
                                                updateHandler={updateHandler}
                                                deleteButtonHandler={deleteButtonHandler}
                                                key={item._id}
                                                item={item}
                                                loading={loading}
                                            />
                                        ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
                <div className='sm:w-[20%] w-[85%] mb-3 flex mx-auto justify-center  sm:h-screen h-fit container1 '>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Users

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.role}</Td>
            <Td>
                {item.subscription && item.subscription.status === 'active'
                    ? 'Active'
                    : 'Not Active'}
            </Td>

            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button
                        onClick={() => updateHandler(item._id)}
                        variant={'outline'}
                        color="purple.500"
                        isLoading={loading}
                    >
                        Change Role
                    </Button>

                    <Button
                        onClick={() => deleteButtonHandler(item._id)}
                        color={'purple.600'}
                        isLoading={loading}
                    >
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    );
}