import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/home/Home';
import Services from '../pages/services/Services';
import Hosts from '../pages/hosts/Hosts';
import Login from '../pages/login/Login';
import { useApplicationStateValue } from '../application/Application';
import SecureRoute from './SecureRoute';
import AddNewHost from '../pages/hosts/AddNewHost';

const MRouter = () => {

    const { authorized } = useApplicationStateValue();

    return (
        <Switch>
            <SecureRoute exact authorized={authorized} path="/hosts/add" component={AddNewHost} />
            <SecureRoute authorized={authorized} path="/hosts" component={Hosts} />
            <SecureRoute authorized={authorized} path="/services/:hostname" component={Services} />
            <SecureRoute authorized={authorized} path="/home" component={Home} />
            <Route path="/" component={Login} />
        </Switch>
    );

};

export default MRouter;