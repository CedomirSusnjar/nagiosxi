import Login from '../pages/login/Login';
import { Route, useHistory } from 'react-router';
import { render } from '@testing-library/react';

const SecureRoute = ({authorized, path, component:Component, exact}) => {

    let render;
    const history = useHistory();

    if(authorized){
        render = <Route exact={exact} path={path} component={Component} />
    }else {
        history.push("/login");
        render = null;
    }

    return render;

};

export default SecureRoute;