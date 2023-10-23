import React from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import PostAuthor from "./postAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";
import {selectPostById} from "./postsSlice.js";
import {useGetSinglePostQuery} from "../api/apiSlice.js";
import PostSkeleton from "./PostSkeleton.jsx";


const SinglePostPage = () => {
    let {postId} = useParams()
    postId = Number(postId)

    // const post = useSelector(state => selectPostById(state, Number(postId)))
    //
    // if (!post) {
    //     return (
    //         <Container className='text-center'>
    //             <h3>Post not found!</h3>
    //         </Container>
    //     )
    // }

    const { data, isFetching, isSuccess } = useGetSinglePostQuery(postId)

    let content
    if (isFetching) {
        content = <PostSkeleton />
    } else if (isSuccess) {
        const [post] = data

        content =
            <Card className="text-center mt-2">
                <Card.Header>
                    <TimeAgo timestamp={post.date} />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                        <PostAuthor userId={post.user} />
                    </Card.Subtitle>
                    <Card.Text>
                        {post.content}
                    </Card.Text>
                    <Button as={Link} to='/posts' className='me-1' variant="primary">Go to posts</Button>
                    <Button as={Link} to={`/editPost/${post.id}`} variant="secondary">Edit</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <ReactionButtons post={post}/>
                </Card.Footer>
            </Card>
    }

    return (
        <Container className='text-center'>
            <h1>Post details</h1>

            {content}
        </Container>
    );
};

export default SinglePostPage;
