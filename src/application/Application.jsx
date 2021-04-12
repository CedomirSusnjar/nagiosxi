import React, {useState} from 'react';
import {withLocalizeStrings} from '../languages/Localize';

const defaultState = {
    backdrop: null,
    loading: null,
    authorized: null
}

const defaultActions = {
    setAuthorized: () => {},
    setLoading: () => {}
}

export const ApplicationContext = React.createContext({
    ...defaultState,
    ...defaultActions
});

export const ApplicationConsumer = ApplicationContext.Consumer;

const ApplicationProvider = ({strings, children}) => {

    const [authorized,setAuthorized] = useState(false);
    const [loading,setLoading] = useState(false);

    const state = {
        authorized,
        loading,
        setAuthorized,
        setLoading
    };

    return (
        <ApplicationContext.Provider value={state}>
            {loading ? (<div>ucitavanje</div>) : children }
        </ApplicationContext.Provider>
    );
};

export const useApplicationStateValue = () => React.useContext(ApplicationContext);


export default withLocalizeStrings(ApplicationProvider);