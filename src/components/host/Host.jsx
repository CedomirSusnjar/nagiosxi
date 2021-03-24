import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Signals from '../signal/Signals';
import { useHistory } from 'react-router';
import HostInformation from '../hostInformation/HostInformation';
import { useState } from 'react';
import HostButtons from '../buttons/hostButtons/HostButtons';

const Container = styled(Flex)`
    border-radius: 20px;
    flex-direction: column;
    height: 100%;
    width: 90%;
`;

const HostName = styled(Flex)`
    padding-top: 8px;
    height: 10%;
    width: 100%;
    padding-left: 14px;
`;

const Status = styled(Flex)`
    color: ${props => props.color};
    font-weight: bold;
    height: 10%;
    padding-top: 4px;
    padding-left: 14px;
`;

const ActionsContainer = styled(Flex)`
    background-color: gainsboro;
    width: 10%;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
`;

const Content = styled(Flex)`
    flex-direction: row;
    height: 45%;
    min-width: 20%;
    width: 20%;
    margin: 20px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: none;
    border: .5px solid gainsboro;
`;

const Host = (props) => {

    const history = useHistory();
    const [action, setActions] = useState(false);

    const onClickHandler = () => {
        history.push("/services");
    }

    const onMouseOverHandler = () => {
        setActions(true);
    }

    const onMouseLeaveHandler = () => {
        setActions(false);
    }

    return (
        <Content onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
            <Container  onClick={onClickHandler}>
                <HostName>192.168.70.14 - Windows</HostName>
                <Status color='green'>Aktivan</Status>
                <HostInformation text="Vrijeme rada: " value="10h 25min" />
                <HostInformation text="Zadnja provjera: " value="10h 25min" />
                <HostInformation text="Status info: " value="OK - 10.198.8.73 rta 196ms lost 0%" />
                <div style={{ 'height': '50%' }}></div>
                <Signals />
            </Container>
            {action &&
                <ActionsContainer>
                    <HostButtons />
                </ActionsContainer>}
        </Content>


    );
}

export default Host;