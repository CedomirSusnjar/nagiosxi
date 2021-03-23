import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/home/Home';
import Services from '../pages/services/Services';
import Hosts from '../pages/hosts/Hosts';
import Service from '../pages/service/Service';

const MRouter = (props) => {

    return (
            <Switch>
                <Route path="/hosts" component={Hosts} />
                <Route path="/service" component={Service} />
                <Route path="/services" component={Services} />
                <Route path="/" component={Home} />
            </Switch>
    );

};

export default MRouter;