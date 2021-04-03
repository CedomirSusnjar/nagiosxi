import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Signals from '../signal/Signals';
import { useHistory } from 'react-router';
import HostInformation from '../hostInformation/HostInformation';
import { useState } from 'react';
import HostButtons from '../buttons/hostButtons/HostButtons';
import { withLocalizeStrings } from '../../languages/Localize';
import { deleteHost } from '../../application/application-service';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 100%;
    width: 90%;
    position: relative;
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
    color: ${props => props.color === "" ? "red" : "green"};
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
    border: .05rem solid gainsboro;
    &:hover {
        box-shadow: 0 .5rem 2.2rem -1.2rem rgba(0,0,0,0.75);
    }
`;

const Host = ({ strings, data, onDeleteHandler }) => {

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
        <Content status={data.output} onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
            <Container onClick={onClickHandler}>
                <HostName>{data.host_name} - {data.address}</HostName>
                <Status color={data.output}>{data.output === "" ? "Neaktivan" : "Aktivan"}</Status>
                <HostInformation text={strings.page.hosts.lastCheck} value={data.last_check} />
                <HostInformation text={strings.page.hosts.nextCheck} value={data.next_check} />
                <HostInformation text={strings.page.hosts.statusInfo} value={data.output} />
                <Signals />
            </Container>
            {action &&
                (<ActionsContainer>
                    <HostButtons onDeleteHandler={onDeleteHandler}/>
                </ActionsContainer>)}
        </Content >
    );
}

export default withLocalizeStrings(Host);