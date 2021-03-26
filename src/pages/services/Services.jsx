import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import BounceLoader from "react-spinners/BounceLoader";
import ServicesList from './ServicesList';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Title = styled(Flex)`
    width: 100%;
    height: 10%;
    font-size: 24px;
    padding-top: 12px;
    position: relative;
    padding-left: 20px;
    margin-bottom: 0;
`;

const SpinnerBlock = styled(Flex)`
    position: absolute;
    top: 40%;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Board = styled(Flex)`
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const Services = (props) => {


    let [services, setServices] = useState(null);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gainsboro");

    useEffect(() => {
        axios.get("http://192.168.17.128/nagiosxi/api/v1/objects/servicestatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1")
            .then(res => {
                console.log(res.data.servicestatus);
                setServices(res.data.servicestatus);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                <Board>
                    <Title>{services[0].host_name + " - " + services[0].host_address}</Title >
                    <ServicesList setServices={setServices} services={services}/>
                </Board >
            </Dashboard >
        )

    );
};

export default Services;