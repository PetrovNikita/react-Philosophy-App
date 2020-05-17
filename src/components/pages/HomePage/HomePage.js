import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Navigation from '../../navigation';
import Text from '../../text';
import {Row, withService, withData} from '../../hoc';
import { Comments } from '../../comments';
import { CommentForm } from '../../commentForm';

import './HomePage.css';


function HomePage ({history, match, service}) {
    const {textName: textNameParam} = match.params;
    const selectText = (textName) => {
        history.push('/home/' + textName);
    };

    const [counter, updateCounter] = useState(1);
    const commentsGetData = () => service.getComments(textNameParam);

    const updateCommentsGetData = () => {
        updateCounter(({counter}) => counter++);   
    }

    return (
        <React.Fragment>
            <Row>
                <Navigation selectText={selectText} getData={service.getCategories} />
                <div className="textAndCommentsContainer">
                    <Text textNameParam={textNameParam} />
                    <CommentForm textNameParam={textNameParam} updateComments={updateCommentsGetData} postComment={service.postComment}/>
                    <Comments getData={commentsGetData}/>
                </div>
            </Row>
        </React.Fragment>
    );
}

export default withService(withRouter(HomePage));