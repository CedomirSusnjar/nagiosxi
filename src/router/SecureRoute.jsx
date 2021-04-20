import { useEffect } from 'react';
import { Route, useHistory } from 'react-router';

const SecureRoute = ({authorized, path, component:Component, exact}) => {

    let render;
    const {push} = useHistory();

    useEffect(() => {
            if(!authorized) {
                push('/login');
            }
    }, [authorized]);

    if(authorized){
        render = <Route exact={exact} path={path} component={Component} />
    }else {
        render = null;
    }

    return render;

};

export default SecureRoute;