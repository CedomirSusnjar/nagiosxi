import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import ServiceButtons from '../buttons/serviceButtons/ServiceButtons';

const Container = styled(Flex)`
    border-radius: 20px;
    flex-direction: column;
    height: 30%;
    width: 10%;
    min-width: 120px;
    margin-left: 20px;
    cursor: pointer;
    box-shadow: none;
    border: .5px solid gainsboro;
    &: hover {
        border: .5px solid gainsboro;
        box-shadow: 0px 5px 37px -12px rgba(0,0,0,0.75);
    }
`;

const ServiceName = styled(Flex)`
    height: 40%;
    width: 100%;
    justify-content: center;
    word-wrap: normal;
    align-items: center;
    text-align: center;
    padding-left: 4px;
    padding-right: 4px;
`;

const Description = styled(Flex)`
    height: 20%;
    width: 100%;
    justify-content: center;
    font-size: 12px;
    align-items: center;
    text-align: center;
    padding-left: 4px;
    padding-right: 4px;
`;

const Status = styled(Flex)`
    justify-content: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 25%;
    font-size: 14px;
    padding-top: 4px;
`;

const Buttons = styled(ServiceButtons)`
    position: absolute;
    bottom: 4px;
    background-color: blue;
    height: 10%;
`;


const Service = ({serviceName, description, status, onDelete}) => {

    // const history = useHistory();

    // const onClickHandler = () => {
    //     history.push("/service");
    // }

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