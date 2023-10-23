import React from 'react';
import {Container, ListGroup} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostsByUser} from "../posts/postsSlice.js";
import {selectUserById} from "./usersSlice.js";

const UserPage = () => {
    let { userId } = useParams()
    userId = Number(userId)

    const user = useSelector(state => selectUserById(state, userId))

    const userPosts = useSelector(state => selectPostsByUser(state, userId))

    const postTitles = userPosts.map(post => (
        <ListGroup.Item key={post.id} as={Link} to={`/posts/${post.id}`} >
            <h5 className='text-muted'>{post.title}</h5>
        </ListGroup.Item>
    ))

    return (
        <Container className='text-center mt-2'>
            <h3>{user.name}'s posts</h3>

            <ListGroup>
                {postTitles}
            </ListGroup>
        </Container>
    );
};

export default UserPage;
