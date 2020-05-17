import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {withService} from '../hoc'; 

import './text.css';

function Text ({textNameParam, loggedIn, service}) {
    const reg = <Link key="reg" to="/reg">register form</Link>;
    const login = <Link key="login" to="/login">log In</Link>;

    const [textBody, getTextBody] = useState([]);

    useEffect( () => {
        if (textNameParam) {
            service.getText(textNameParam)
                .then( (res) => getTextBody([...res]));
        }
    }, [textNameParam])

    return <div className="textContainer"> 
            {
                loggedIn ?
                    textNameParam ? 
                        [
                            <div key="name" className="textName">{textNameParam}</div>,
                            <div key="body" className="textBody">{textBody}</div>
                        ]

                    :
                        "Select text, please"
                :
                    [`You are not logged in. Fill in `, reg, ` or `,login,`, if you already registred`]
            } 
        </div>;
}

const mapStateToProps = ({loggedIn}) => {
    return {loggedIn};
}

const mapDispatchToProps = () => {
    return {};
}

export default withService(connect(mapStateToProps, mapDispatchToProps)(Text));