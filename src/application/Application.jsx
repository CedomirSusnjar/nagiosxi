import React, {useState} from 'react';
import {withLocalizeStrings} from '../languages/Localize';

const defaultState = {
    loading: null,
    authorized: null,
    username: null
}

const defaultActions = {
    setAuthorized: () => {},
    setLoading: () => {},
    setUsername: () => {},
    setApikey: () => {}
}

export const ApplicationContext = React.createContext({
    ...defaultState,
    ...defaultActions
});

export const ApplicationConsumer = ApplicationContext.Consumer;

const ApplicationProvider = ({strings, children}) => {

    const [authorized,setAuthorized] = useState(false);
    const [loading,setLoading] = useState(false);
    const [username,setUsername] = useState('');
    const [apikey, setApikey] = useState('');
    
    const state = {
        authorized,
        loading,
        username,
        apikey,
        setAuthorized,
        setLoading,
        setUsername, 
        setApikey
    };

    return (
        <ApplicationContext.Provider value={state}>
            {loading ? (<div>ucitavanje</div>) : children }
        </ApplicationContext.Provider>
    );
};

export const useApplicationStateValue = () => React.useContext(ApplicationContext);


export default withLocalizeStrings(ApplicationProvider);