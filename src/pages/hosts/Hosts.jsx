import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import AddHost from '../../components/host/AddHost';
import Host from '../../components/host/Host';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const SpinnerBlock = styled(Flex)`
    position: absolute;
    top: 40%;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Hosts = (props) => {


    const [hosts, setHosts] = useState(null);
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gainsboro");

    useEffect(() => {
        axios.get("http://192.168.17.128/nagiosxi/api/v1/objects/hoststatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1").
            then(res => {
                console.log(res.data.hoststatus);
                setHosts(res.data.hoststatus);
                setLoading(false);
                console.log(res.data.hoststatus);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                {hosts.map(host => {
                    return <Host host={host}/>
                })}
                <AddHost />
            </Dashboard>
        )

    );

};

export default Hosts;