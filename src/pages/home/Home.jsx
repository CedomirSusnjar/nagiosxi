import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import Host from '../../components/host/Host';

const Home = (props) => {

    return (
        <Dashboard>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <Host></Host>
        </Dashboard>
    );

};

export default Home;