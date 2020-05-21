import React, {useState} from "react";
import { connect } from "react-redux";
import {withRouter, Link} from "react-router-dom";
import Navigation from '../../navigation';
import Text from '../../text';
import {Row, withService, withData} from '../../hoc';
import { Comments } from '../../comments';
import { CommentForm } from '../../commentForm';

import './HomePage.css';


function HomePage ({loggedIn, history, match, service}) {
    const {textName: textNameParam} = match.params;
    const selectText = (textName) => {
        history.push('/home/' + textName);
    };

    const [counter, updateCounter] = useState(1);
    const textGetData = () => service.getText(textNameParam);
    const commentsGetData = () => service.getComments(textNameParam);

    const updateCommentsGetData = () => {
        updateCounter(({counter}) => counter++);   
    }

    return (
        <React.Fragment>
            <Row>
                <Navigation selectText={selectText} getData={service.getCategories} />
                
                {loggedIn ? 
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
                }
            </Row>
        </React.Fragment>
    );
}

const mapStateToProps = ({loggedIn}) => {
    return {loggedIn};
}

const mapDispatchToProps = () => {
    return {};
}

export default withService(withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage)));