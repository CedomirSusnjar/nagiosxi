import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButtons from '../buttons/serviceButtons/ServiceButtons';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 20rem;
    width: 15rem;
    min-width: 12rem;
    margin: 2rem;
    box-shadow: none;
    border: .2rem solid gainsboro;
    position: relative;  
    overflow: hidden;
`;

const ServiceName = styled(Flex)`
    height: 8rem;
    width: 100%;
    justify-content: center;
    word-wrap: normal;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
`;

const Description = styled(Flex)`
    height: 4rem;
    width: 100%;
    justify-content: center;
    font-size: 1.2rem;
    align-items: center;
    text-align: center;
`;

const Status = styled(Flex)`
    justify-content: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 5rem;
    font-size: 1.4rem;
`;

const Service = ({serviceName, description, status, onDelete}) => {

    return (
        <Container>
            <ServiceName>{serviceName}</ServiceName>
            <Description>{description}</Description>
            <Status color='green'>{status}</Status>
            <ServiceButtons onDelete={onDelete}/>
        </Container>
    );
}

export default Service;