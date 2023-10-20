import React, {useEffect} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import AddPostForm from "./AddPostForm.jsx";
import {Link} from "react-router-dom";
import PostAuthor from "./postAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";
import {selectAllPosts, fetchPosts} from './postsSlice.js'
import PostSkeleton from "./PostSkeleton.jsx";


const PostExcerpt = ({ post }) => {
    return (
        <Card key={post.id} className='mb-4' bg='light'>
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
                <Button className='me-2' as={Link} to={`/posts/${post.id}`} variant="primary">See post</Button>
                <Button as={Link} to={`/editPost/${post.id}`} variant="secondary">Edit</Button>
            </Card.Body>
            <Card.Footer>
                <ReactionButtons post={post}/>
            </Card.Footer>
        </Card>
    )
}

const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)

    const postsStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch, postsStatus])

    let content

    if (postsStatus === 'loading') {
        content = <PostSkeleton />
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.concat().sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post}/>
        ))
    } else if (postsStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <Container>
            <h1>Posts</h1>

            <AddPostForm/>

            {content}
        </Container>
    );
};

export default PostsList;
