import React, {useState} from "react";
import {Link} from "react-router-dom";
import Text from '../text';
import {withService} from '../hoc';
import { Comments } from '../comments';
import { CommentForm } from '../commentForm';

const TextAndCommentsContainer = ({loggedIn, textNameParam, service}) => {

    const [counter, updateCounter] = useState(1);
    const textGetData = () => service.getText(textNameParam);
    const commentsGetData = () => service.getComments( "textName", textNameParam);

    const updateCommentsGetData = () => {
        updateCounter(({counter}) => counter++);   
    }

    return (
        loggedIn ? 
            textNameParam ?
                <div className="textAndCommentsContainer">
                    <Text textNameParam={textNameParam} getData={textGetData}/>
                    <div className="formAndCommentsContainer">
                        <CommentForm textNameParam={textNameParam} updateComments={updateCommentsGetData} postComment={service.postComment}/>
                        <Comments getData={commentsGetData}/>
                    </div>
                </div>
            : 
                "Select text, please"   
        :
            <div className="textAndCommentsContainer">
                You are not logged in. Fill in <Link key="reg" to="/reg">register form</Link> or <Link key="login" to="/login">log In</Link>, if you already registred.
            </div>
    );
}

export default withService(TextAndCommentsContainer);