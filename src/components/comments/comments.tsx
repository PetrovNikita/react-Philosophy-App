import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withData } from "../hoc";

import './comments.css';
import { IComment } from "../../interfaces";

//показывает комменты из getComments(textName)
const Comments: React.FC<{data: IComment[], history: History}> = ({ data: comments, history }) => {
    console.log(comments);
    return (
        <div className='commentsContainer'>
            {comments.length ? comments.map(comment => <Comment key={`${comment.commentText}|${comment.commentDate}`} {...comment} />) 
                : 'There will be comments...'}
        </div>
    )
}


const Comment: React.FC<IComment> = ({ userLogin, commentDate, commentText, textName }) => {
        return (
            <div className='commentInstance'>
                {userLogin && <div><Link to={"/users/"+userLogin}>{userLogin}</Link> commented at {commentDate.toLocaleString()}.</div>}
                {textName &&  <div>Commented on <Link to={"/home/"+textName}>{textName}</Link> at {commentDate.toLocaleString()}. </div>}
                <div className = 'commentText'>
                    {commentText}
                </div>
            </div>
        );
};


export default withRouter(withData(Comments));
