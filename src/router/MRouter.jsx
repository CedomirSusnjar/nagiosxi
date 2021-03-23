import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/home/Home';

const MRouter = (props) => {

    console.log('MRouter');
    
    return (
        <Switch>
            <Route path="/" component={Home}/>
        </Switch>
    );

};

export default MRouter;