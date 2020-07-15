import React from "react";
import Header from "../../header";
import Footer from "../../footer";
import WithRouter, { Link } from "react-router-dom";
import {Row} from '../../hoc';

import "./HomePage.scss";


const HomePage: React.FC = () => {
    return <>
    <Header/>
    <Row>
        <Link to="/texts" className="link">Texts</Link>
        <Link to="/users" className="link">Users</Link>
    </Row>
    <Footer/>
    </>;
}

export {HomePage};