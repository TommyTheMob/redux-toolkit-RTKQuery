import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {addReactionThroughServer} from './postsSlice.js'
import {useDispatch} from "react-redux";
import {useAddReactionMutation} from "../api/apiSlice.js";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation()

    const onAddReactionBtnClick = (name) => {
        const reactions = Object.entries(post.reactions).map(([reaction, value]) => reaction === name
            ? [reaction, value + 1]
            : [reaction, value]
        )

        let updatedReactions = {}
        reactions.forEach(([reaction, value]) => {
            updatedReactions[reaction] = value
        })

        addReaction({postId: post.id, reactions: updatedReactions})
    }

    const reactionButtons = Object.entries(reactionEmoji)
        .map(([name, emoji]) => (
            <Button
                className={`m-1`}
                size='sm'
                variant='outline-secondary'
                key={name}
                onClick={() => onAddReactionBtnClick(name)}
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
