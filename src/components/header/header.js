import React, { useState } from "react";
import {Link} from "react-router-dom";
import './header.css';
import { Row } from "../hoc";

function Content({showAdditionalContent}) {
    return (showAdditionalContent ? 
        <div className = "headerContent">
            Hi!<br></br>
            Here you can think about many important questions in your life and see what other people think about it.<br></br>
            And you can take a contact of person, who have interesting opinion for you.<br></br>
            We have a lot of texts, partitioned by categories and you can comment all of them after filling the registration form.
        </div> :
                <div className = "headerContent">
                    Hi!<br></br>
                    Here you can think about many important questions in your life and see what other people think about it.<br></br>
                    And you can take a contact of person, who have interesting opinion for you...
                </div>
    )
}

function ShowHideSwitcher({showAdditionalContent, parentHandleClick}) {
    return ( showAdditionalContent ?
        <span className = "tooglerHeaderAdditionalContent" onClick = {() => parentHandleClick()}>Hide</span>
        :
        <span className = "tooglerHeaderAdditionalContent" onClick = {() => parentHandleClick()}>Show more information</span>
    )
}

function Menu ({loggedIn}) {
    return ( 
        <div className="headerMenu"> {loggedIn ?
            <button className="headerButton logOutButton" hidden>Log Out</button>
            : <>
            <button className="headerButton toRegisterButton"><Link to="/reg">Register</Link></button>
            <button className="headerButton toLoginButton"><Link to="/login">Log In</Link></button>
            </>}
        </div>
    );
}

export default function Header () {
    let [additionalContent, changeAdditionalContent] = useState(false);

    let handleClick = () => {
        changeAdditionalContent((additionalContent) => !additionalContent);
        console.log(additionalContent);
    }

    return (
        <Row className="headerContainer">
            <div className="headerContentContainer">
                <Content showAdditionalContent = {additionalContent}/>
                <ShowHideSwitcher showAdditionalContent = {additionalContent} parentHandleClick = {handleClick}/>
            </div>
            <Menu loggedIn={false}/>
        </Row>
    );
}

