import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButtons from '../buttons/serviceButtons/ServiceButtons';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 20rem;
    width: 15rem;
    min-width: 12rem;
    margin: 1.5rem;
    box-shadow: none;
    border: .2rem solid gainsboro;
    position: relative;  
    overflow: hidden;
    justify-content: center;
`;

const ServiceName = styled(Flex)`
    height: 2.5rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    position: absolute;
    top: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const Description = styled(Flex)`
    height: 10rem;
    width: 100%;
    justify-content: center;
    font-size: 1rem;
    align-items: center;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const Status = styled(Flex)`
    justify-content: center;
    align-items: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 2.5rem;
    font-size: 1.4rem;
`;

const Service = ({data, onDelete}) => {

    return (
        <Container>
            <ServiceName>{data.service_description}</ServiceName>
            <Description>{data.output}</Description>
            <Status color='green'>{data.state_type}</Status>
            <ServiceButtons onDelete={onDelete}/>
        </Container>
    );
}

export default Service;