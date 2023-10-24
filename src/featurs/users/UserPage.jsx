import React, {useMemo} from 'react';
import {Container, ListGroup} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostsByUser} from "../posts/postsSlice.js";
import {selectUserById} from "./usersSlice.js";
import {createSelector} from "@reduxjs/toolkit";
import {useGetPostsQuery} from "../api/apiSlice.js";

const UserPage = () => {
    let { userId } = useParams()
    userId = Number(userId)

    const user = useSelector(state => selectUserById(state, userId))

    const selectPostsForUser = useMemo(() => {
        const emptyArray = []
        return createSelector(
            res => res.data,
            (res, userId) => userId,
            (data, userId) => data?.filter(post => post.user === userId) ?? emptyArray
        )
    }, [])

    const { postsForUser } = useGetPostsQuery(undefined, {
        selectFromResult: result => ({
            ...result,
            postsForUser: selectPostsForUser(result, userId)
        })
    })

    const postTitles = postsForUser.map(post => (
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
