import React from 'react';
import {Button} from "react-bootstrap";
import { addReaction } from '../posts/postsSlice.js'
import {useDispatch} from "react-redux";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji)
        .map(([name, emoji]) => (
            <Button
                className='m-1'
                size='sm'
                variant='outline-secondary'
                key={name}
                onClick={() => dispatch(addReaction(post.id, name))}
            >
                {emoji} {post.reactions[name]}
            </Button>
        ))
    return (
        <div>
            {reactionButtons}
        </div>
    );
};

export default ReactionButtons;
