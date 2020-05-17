import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import store from '../../store.js';
import ErrorBoundry from '../error-boundry';
import {ServiceProvider} from '../service-context';
import mockService from '../../mockService';
import RegPage from "../pages/RegPage";
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Header from "../header";
import Footer from "../footer";


export default function App () {
    return ( 
        <Provider store={store} >
            <ErrorBoundry>
                <ServiceProvider value = {mockService}>
                    <Router>
                        <Header />
                        <Switch>
                            <Route path="/home/:textName?" component={HomePage} />
                            <Route path="/reg" component={RegPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route render={() => <Redirect to="/home/"/> } />
                        </Switch>
                        <Footer />
                    </Router>
                </ServiceProvider>
            </ErrorBoundry>
        </Provider>
    );
}