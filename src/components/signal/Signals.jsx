import styled from 'styled-components';
import Signal from './Signal';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    position: absolute;
    bottom: 1rem;
    flex-wrap: wrap;
    height: 20%;
    justify-content: center;
    width: 100%;
`;

const Signals = ({hostname}) => {

    return (
        <Container>
            <Signal service="Memory Usage" color="#D62839" hostname={hostname}/>
            <Signal service="Root Partition" color="#BA324F" hostname={hostname}/>
            <Signal service="PING" color="#175676" hostname={hostname}/>
            <Signal service="Swap Usage" color="#4BA3C3" hostname={hostname}/>
        </Container>
    );

};

export default Signals;