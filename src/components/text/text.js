import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function Text ({textNameParam, loggedIn}) {
    console.log(loggedIn);

    const reg = <Link key="reg" to="/reg">register form</Link>;
    const login = <Link key="login" to="/login">log In</Link>;
    let text = 
            loggedIn ?
                textNameParam ? 
                    `Name of text: ${textNameParam}.`
                :
                    "Select text, please"
            :
                [`Fill in `, reg, ` or `,login,`, if you already registred`];
    return <div> {text} </div>;
}

const mapStateToProps = ({loggedIn}) => {
    return {loggedIn};
}

const mapDispatchToProps = () => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);