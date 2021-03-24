import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/home/Home';
import Services from '../pages/services/Services';
import Hosts from '../pages/hosts/Hosts';
import Login from '../pages/login/Login';
import { useApplicationStateValue } from '../application/Application';

const MRouter = (props) => {

    const { authorized } = useApplicationStateValue();

    return (
        <Switch>
            <Route path="/login" component={Login} />
            {authorized &&
                <>
                    <Route path="/hosts" component={Hosts} />
                    <Route path="/services" component={Services} />
                    <Route path="/home" component={Home} />
                </>}
            <Route path="/" component={Login} />
        </Switch>
    );

};

export default MRouter;