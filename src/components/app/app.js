import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import store from '../../store.js';
import ErrorBoundry from '../error-boundry';
import {ServiceProvider} from '../service-context';
import mockService from '../../mockService';
import HomePage from '../pages/HomePage';
import TextsPage from "../pages/TextsPage";

const RegPage = lazy(() => import('../pages/RegPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const UsersPage = lazy(() => import('../pages/UsersPage'));
const UserPage = lazy(() => import('../pages/UserPage'));

export default function App () {
    return ( 
        <Provider store={store} >
            <ErrorBoundry>
                <ServiceProvider value = {mockService}>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Router>
                            <Switch>
                                <Route path="/home" component={HomePage} />
                                <Route path="/texts/:textName?" component={TextsPage} />
                                <Route path="/reg" component={RegPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/users" component={UsersPage} />
                                <Route path="/users/:userLogin" component={UserPage} />
                                <Route render={() => <Redirect to="/home/"/> } />
                            </Switch>
                        </Router>
                    </Suspense>
                </ServiceProvider>
            </ErrorBoundry>
        </Provider>
    );
}