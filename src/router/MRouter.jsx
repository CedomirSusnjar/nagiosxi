import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/home/Home';
import Services from '../pages/services/Services';
import HostPage from '../pages/hostPage/HostPage';
import Login from '../pages/login/Login';
import { useApplicationStateValue } from '../application/Application';
import SecureRoute from './SecureRoute';
import AddNewHost from '../pages/hostPage/AddNewHost';
import AddNewService from '../pages/services/AddNewService';

const MRouter = () => {

    const { authorized } = useApplicationStateValue();

    return (
        <Switch>
            <SecureRoute exact authorized={authorized} path="/hosts/add" component={AddNewHost} />
            <SecureRoute exact authorized={authorized} path="/:hostname/services/add" component={AddNewService} />
            <SecureRoute authorized={authorized} path="/hosts" component={HostPage} />
            <SecureRoute authorized={authorized} path="/services/:hostname" component={Services} />
            <SecureRoute authorized={authorized} path="/home" component={Home} />
            <Route path="/" component={Login} />
        </Switch>
    );

};

export default MRouter;