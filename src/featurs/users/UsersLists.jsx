import React from 'react';
import {Container, ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectAllUsers} from "./usersSlice.js";
import {Link} from "react-router-dom";

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <ListGroup.Item key={user.id} as={Link} to={`/users/${user.id}`}>
            <h5 className='text-muted'>{user.name}</h5>
        </ListGroup.Item>

    ))

    return (
        <Container className='text-center'>
            <h1>Users</h1>

            <ListGroup className='mt-3' as="ul">
                {renderedUsers}
            </ListGroup>
        </Container>
    );
};

export default UsersList;
