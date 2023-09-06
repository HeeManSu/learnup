import React from 'react'
import {
    RiAddCircleFill,
    RiDashboardFill,
    RiEyeFill,
    RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Sidebar = () => {

    const location = useLocation();
    return (
        <div className='py-16 flex flex-col gap-7'>
            <LinkButton
                Icon={RiDashboardFill}
                text="Dashboard"
                url={"dashboard"}
                active={location.pathname === '/admin/dashboard'}
            />
            <LinkButton
                Icon={RiAddCircleFill}
                text="Create Course"
                url={'createcourse'}
                active={location.pathname === '/admin/createcourse'}
            />
            <LinkButton
                Icon={RiEyeFill}
                text="Courses"
                url={'courses'}
                active={location.pathname === '/admin/courses'}
            />
            <LinkButton
                Icon={RiUser3Fill}
                text="Users"
                url={'users'}
                active={location.pathname === '/admin/users'}
            />
        </div>
    )
}

export default Sidebar

function LinkButton({ url, Icon, text, active }) {
    return (
        <Link to={`/admin/${url}`}>
            <Button
                fontSize={'larger'}
                variant={'ghost'}
                colorScheme={active ? 'purple' : ""}
            >
                <Icon style={{ margin: '4px' }} />
                {text}
            </Button>
        </Link>
    )
}