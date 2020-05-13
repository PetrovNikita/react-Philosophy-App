import React from "react";
import RegPage from "../pages/regPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App () {
    return ( 
    <Router>
        <Switch>
            <Route path="/" component={RegPage} exact />
        </Switch>
    </Router>
    );
}