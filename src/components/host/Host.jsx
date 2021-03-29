import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Signals from '../signal/Signals';
import { useHistory } from 'react-router';
import HostInformation from '../hostInformation/HostInformation';
import { useEffect, useState } from 'react';
import HostButtons from '../buttons/hostButtons/HostButtons';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import { withLocalizeStrings } from '../../languages/Localize';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 100%;
    width: 90%;
`;

const HostName = styled(Flex)`
    padding-top: .8rem;
    height: 10%;
    width: 100%;
    padding-left: 1.4rem;
    font-size: 1.5rem;
    font-weight: bold;
`;

const Status = styled(Flex)`
    color: ${props => props.color};
    font-weight: bold;
    height: 10%;
    padding-top: .4rem;
    padding-left: 1.4rem;
    font-size: 1.5rem;
`;

const ActionsContainer = styled(Flex)`
    background-color: gainsboro;
    width: 10%;
    border-bottom-right-radius: 2rem;
    border-top-right-radius: 2rem;
    overflow: hidden;
`;

const Content = styled(Flex)`
    flex-direction: row;
    height: 30rem;
    min-width: 30rem;
    width: 30rem;
    margin: 2rem;
    border-radius: 2rem;
    cursor: pointer;
    box-shadow: none;
    border: .05rem solid gainsboro;
`;

const Host = ({ strings, data }) => {

    const history = useHistory();
    const [action, setActions] = useState(false);
    const [services, setServices] = useState(null);

    const onClickHandler = () => {
        history.push("/services/2");
    }

    const onMouseOverHandler = () => {
        setActions(true);
    }

    const onMouseLeaveHandler = () => {
        setActions(false);
    }

    return (
        <Content onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
            <Container onClick={onClickHandler}>
                <HostName>{data.host_name}</HostName>
                <Status color='green'>Aktivan</Status>
                <HostInformation text={strings.page.hosts.lastCheck} value={data.last_check} />
                <HostInformation text={strings.page.hosts.nextCheck} value={data.next_check} />
                <HostInformation text={strings.page.hosts.statusInfo} value={data.output} />
                <div style={{ 'height': '50%' }}></div>
                <Signals />
            </Container>
            {true &&
                (<ActionsContainer>
                    <HostButtons />
                </ActionsContainer>)}
        </Content >
    );
}

export default withLocalizeStrings(Host);