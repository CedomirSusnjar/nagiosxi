import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { useEffect, useState } from 'react';
import { getServiceByName } from '../../application/application-service';
import BounceLoader from "react-spinners/BounceLoader";

const Container = styled(Flex)`
    height: 45%;
    width: 45%;
    margin-left: .3rem;
    border-radius: .5rem;
    margin-right: .3rem;
    background-color: ${props => props.color};
    color: white;
    font-weight: bold;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const SpinnerBlock = styled(Flex)`
    height: 45%;
    width: 45%;
    margin-left: .3rem;
    margin-right: .3rem;
    border-radius: .5rem;
    border: .05rem solid ${props => props.color};
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const ServiceName = styled(Flex)`
    font-size: 1rem;
    justify-content: center;
    width: 100%;
    align-items: center;
    font-weight: normal;
`;

const Status = styled(Flex)`
    font-size: .8rem;
    justify-content: center;
    width: 50%;
    text-align: center;
    padding-right: .5rem;
    align-items: center;
    font-weight: bold;
`;

const Signal = ({ color, hostname, service }) => {

    let [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    const trimServiceStatus = (message) => {
        return message.substring(0, message.indexOf('-')).trim();
    }

    useEffect(() => {

        (async function () {
            try {
                const response = await getServiceByName(service, hostname);
                let message = response.data.servicestatus[0].output;
                setText(trimServiceStatus(message));
                setTimeout(function () { setLoading(false); }, 1000);
            } catch (err) {
                console.log(err);
                setText('Not configured');
                setTimeout(function () { setLoading(false); }, 1000);           
            }

        })();

    }, [hostname,service]);

    return (
        loading ? (
            <SpinnerBlock color={color}>
                <BounceLoader color={color} loading={loading} size={20} />
            </SpinnerBlock>
        ) : (
            <Container color={color}>
                <ServiceName>{service}</ServiceName>
                <Status>{text}</Status>
            </Container>
        )
    );

};

export default Signal;