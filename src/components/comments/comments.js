import React from "react";
import { withData } from "../hoc";

import './comments.css';

//показывает комменты из getComments(textName)
function Comments({ data: comments }) {
    console.log(comments);
    return (
        <div className='commentsContainer'>
            {comments.length ? comments.map(comment => <Comment key={`${comment.commentText}|${comment.commentDate}`} {...comment} />) 
                : 'There will be comments...'}
        </div>
    )
}


function Comment({ userLogin, commentDate, commentText }) {
    return (
        <div className='commentInstance'>
            {userLogin} commented at {commentDate.toLocaleString()}.
            <div className = 'commentText'>
                {commentText}
            </div>
        </div>
    );
};


export default withData(Comments);
