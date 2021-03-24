import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import AddHost from '../../components/host/AddHost';
import Host from '../../components/host/Host';

const Hosts = (props) => {

    return (
        <Dashboard>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <Host></Host>
            <AddHost></AddHost>
        </Dashboard>
    );

};

export default Hosts;