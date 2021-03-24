import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButton from './serviceButton/ServiceButton';

const Container = styled(Flex)`
    flex-direction: row;
    width: 90%;
    height: 10%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin: 0 auto;
`;

const LeftServiceButton = styled(ServiceButton)`
    border-bottom-left-radius: 20px;
`;

const RightServiceButton = styled(ServiceButton)`
    border-bottom-right-radius: 20px;
`;

const ServiceButtons = (props) => {
    return (
        <Container>
            <LeftServiceButton icon="images/pencil.png"/>
            <ServiceButton icon="images/delete.png"/>
            <RightServiceButton icon="images/delete.png"/>
        </Container>
    );

};

export default ServiceButtons;