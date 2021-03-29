import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import ServiceButtons from '../buttons/serviceButtons/ServiceButtons';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 20rem;
    width: 15rem;
    min-width: 12rem;
    margin: 2rem;
    cursor: pointer;
    box-shadow: none;
    border: .2rem solid gainsboro;
`;

const ServiceName = styled(Flex)`
    height: 8rem;
    width: 100%;
    justify-content: center;
    word-wrap: normal;
    align-items: center;
    text-align: center;
    padding-left: .4rem;
    padding-right: .4rem;
    font-size: 1.5rem;
`;

const Description = styled(Flex)`
    height: 4rem;
    width: 100%;
    justify-content: center;
    font-size: 1.2rem;
    align-items: center;
    text-align: center;
    padding-left: .4rem;
    padding-right: .4rem;
`;

const Status = styled(Flex)`
    justify-content: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 5rem;
    font-size: 1.4rem;
    padding-top: .4rem;
`;

const Buttons = styled(ServiceButtons)`
    position: absolute;
    bottom: .4rem;
    background-color: blue;
    height: 2rem;
`;


const Service = ({serviceName, description, status, onDelete}) => {

    return (
        <Container>
            <ServiceName>{serviceName}</ServiceName>
            <Description>{description}</Description>
            <Status color='green'>{status}</Status>
            <Buttons onDelete={onDelete}/>
        </Container>
    );
}

export default Service;