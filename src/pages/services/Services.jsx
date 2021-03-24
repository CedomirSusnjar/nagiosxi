import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import Service from '../../components/service/Service';

const Title = styled(Flex)`
    width: 100%;
    height: 10%;
    font-size: 24px;
    padding-top: 12px;
    justify-content: center;
    position: relative;
`;

const ServicesContainer = styled(Flex)`
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
`;

const Board = styled(Flex)`
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const Services = (props) => {

    return (
        <Dashboard>
            <Board>
            <Title>Windows 192.168.12.15</Title>
            <ServicesContainer>
                <Service />
                <Service />
                <Service />
            </ServicesContainer>
            </Board>
        </Dashboard>
    );
};

export default Services;