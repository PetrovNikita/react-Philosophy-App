import React, {useState} from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import Navigation from '../../navigation';
import TextAndCommentsContainer from '../../textAndCommentsContainer';
import {Row, withService} from '../../hoc';
import { toggleNav } from "../../../actions";

import './HomePage.css';


function HomePage ({loggedIn, history, match, service, showNavigation, toggleNav}) {
    const {textName: textNameParam} = match.params;
    const clientWidthIsSmall = document.documentElement.clientWidth < 400;

    const selectText = (textName) => {
        if (clientWidthIsSmall) toggleNav();
        history.push('/home/' + textName);
    };

    return (
        <React.Fragment>
            {clientWidthIsSmall ?
                showNavigation ? 
                    <Navigation selectText={selectText} getData={service.getCategories} />
                    :
                    <Row>
                        <button className="showNavButton" onClick={() => toggleNav()}>+</button>
                        <TextAndCommentsContainer loggedIn={loggedIn} textNameParam={textNameParam} />
                    </Row>
                :
            <Row>
                <Navigation selectText={selectText} getData={service.getCategories} />
                <TextAndCommentsContainer loggedIn={loggedIn} textNameParam={textNameParam} />
            </Row>
            }
        </React.Fragment>
    );
}

const mapStateToProps = ({loggedIn, showNavigation}) => {
    return {loggedIn, showNavigation};
}

const mapDispatchToProps = (dispatch) => {
    return {toggleNav: () => dispatch(toggleNav())};
}

export default withService(withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage)));