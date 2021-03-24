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
    margin: 20px;
    cursor: pointer;
    box-shadow: 0px 5px 37px -12px rgba(0,0,0,0.75);
    &: hover {
        box-shadow: none;
        border: .5px solid gainsboro;
    }
`;

const ServiceName = styled(Flex)`
    padding-top: 8px;
    height: 20%;
    width: 100%;
    justify-content: center;
`;

const Description = styled(Flex)`
    padding-top: 8px;
    height: 30%;
    width: 100%;
    justify-content: center;
    font-size: 12px;
`;

const Status = styled(Flex)`
    justify-content: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 35%;
    font-size: 14px;
    padding-top: 12px;
`;

const Buttons = styled(ServiceButtons)`
    position: absolute;
    bottom: 4px;
    background-color: blue;
    height: 10%;
`;


const Service = (props) => {

    // const history = useHistory();

    // const onClickHandler = () => {
    //     history.push("/service");
    // }

    return (
        <Container>
            <ServiceName>HTTP</ServiceName>
            <Description>protokol</Description>
            <Status color='green'>Aktivan</Status>
            <Buttons />
        </Container>
    );
}

export default Service;