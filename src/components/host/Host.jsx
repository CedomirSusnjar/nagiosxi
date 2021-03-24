import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Signals from '../signal/Signals';
import { useHistory } from 'react-router';
import HostInformation from '../hostInformation/HostInformation';

const Container = styled(Flex)`
    border-radius: 20px;
    flex-direction: column;
    height: 45%;
    min-width: 20%;
    margin: 20px;
    cursor: pointer;
    box-shadow: 0px 5px 37px -12px green;
    &: hover {
        box-shadow: none;
        border: .5px solid gainsboro;
    }
`;

const HostName = styled(Flex)`
    padding-top: 8px;
    height: 10%;
    width: 100%;
    justify-content: center;
`;

const Status = styled(Flex)`
    justify-content: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 10%;
    padding-top: 4px;
`;

const Host = (props) => {

    const history = useHistory();

    const onClickHandler = () => {
        history.push("/services");
    }

    return (
        <Container onClick={onClickHandler}>
            <HostName>192.168.70.14 - Windows</HostName>
            <Status color='green'>Aktivan</Status>
            <HostInformation text="Vrijeme rada: " value="10h 25min"/>
            <HostInformation text="Zadnja provjera: " value="10h 25min"/>
            <HostInformation text="Status info: " value="OK - 10.198.8.73 rta 196ms lost 0%"/>
            <div style={{'height': '50%'}}></div>
            <Signals/>
        </Container>
    );
}

export default Host;