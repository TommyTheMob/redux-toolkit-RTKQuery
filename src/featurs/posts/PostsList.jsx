import React, {useEffect, useMemo} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import AddPostForm from "./AddPostForm.jsx";
import {Link} from "react-router-dom";
import PostAuthor from "./postAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";
import {selectAllPosts, fetchPosts} from './postsSlice.js'
import PostSkeleton from "./PostSkeleton.jsx";
import { useGetPostsQuery } from '../api/apiSlice.js'


const PostExcerpt = ({ post, fetching }) => {
    return (
        <Card key={post.id} className={`mb-4`} bg={fetching ? 'secondary' : 'light'}>
            <Card.Header>
                <TimeAgo timestamp={post.date}/>
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <PostAuthor userId={post.user}/>
                </Card.Subtitle>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <Button className='me-2' as={Link} to={`/posts/${post.id}`} variant={fetching ? "outline-secondary" : "primary"}>See post</Button>
                <Button as={Link} to={`/editPost/${post.id}`} variant={fetching ? "outline-secondary" : "secondary"}>Edit</Button>
            </Card.Body>
            <Card.Footer>
                <ReactionButtons post={post} />
            </Card.Footer>
        </Card>
    )
}

const PostsList = () => {
    // const dispatch = useDispatch()
    // const posts = useSelector(selectAllPosts)
    //
    // const postsStatus = useSelector(state => state.posts.status)
    // const error = useSelector(state => state.posts.error)
    //
    // useEffect(() => {
    //     if (postsStatus === 'idle') {
    //         dispatch(fetchPosts())
    //     }
    // }, [dispatch, postsStatus])

    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPostsQuery()

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.concat()
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    let content

    if (isLoading) {
        content =
            <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </>
    } else if (isSuccess) {
        content =  sortedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} fetching={isFetching}/>
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <Container>
            <h1>Posts</h1>

            <AddPostForm/>

            <Button className='mb-2' variant={"secondary"} onClick={refetch}>Refetch posts</Button>
            {content}
        </Container>
    );
};

export default PostsList;
