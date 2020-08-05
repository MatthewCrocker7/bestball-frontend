import React from 'react';
import { Route, Redirect } from "react-router-dom";

import { authentication } from '../utils/AuthenticationService';

const ProtectedRoute = (props) => {
    return (
        authentication.isAuthenticated() ?
        <Route
            path={props.path}
            component={props.component}
        />
        :
        <Redirect to='/login'/>
    );
};

export default ProtectedRoute;
