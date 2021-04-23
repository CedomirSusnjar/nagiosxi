import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import HostInformation from '../hostInformation/HostInformation';
import { useHistory } from 'react-router';
import { strings, withLocalizeStrings } from '../../languages/Localize';

const Container = styled(Flex)`
    width: 25rem;
    height: 20rem;
    border: .05rem solid gainsboro;
    margin: 1.5rem;
    border-radius: 2rem;
    &:hover {
        box-shadow: 0 .5rem 2.2rem -1.2rem rgba(0,0,0,0.75);
    }
    flex-direction: column;
    padding-top: 1.5rem;
    position: relative;
    cursor: pointer;
`;

const HGHostsNum = styled(Flex)`
    width: 100%;
    height: 15%;
    text-align: left;
    padding-left: 1rem;
    justify-content: center;
    font-size: 2.2rem;
    font-weight: bold;
`;

const HGNumContainer = styled(Flex)`
    flex-direction: column;
    position: absolute;
    bottom: 2rem;
    width: 100%;
`;

const HGNumLabel = styled(Flex)`
    justify-content: center;
`;

const HGName = styled(Flex)`
    width: 100%;
    height: 3rem;
    font-weight: bold;
    padding-left: 1.5rem;
    font-size: 1.6rem;
`;

const HGAlias = styled(Flex)`
    width: 100%;
    height: 2rem;
    padding-left: 1.5rem;
    font-size: 1.2rem;  
`;

const HostsContainer = styled(Flex)`
    flex-wrap: wrap;
    width: 100%;
    padding: 1.5rem;
`;

const Host = styled(Flex)`
    border: .1rem solid gray;
    border-radius: 1rem;
    margin-right: .5rem;
`;

const HostName = styled(Flex)`
    padding-left: .5rem;
    padding-right: .5rem;
`;

const HGHosts = styled(Flex)`
    width: 100%;
    padding-left: 1.5rem;
`;

const HostGroup = ({name, alias, hosts}) => {

    const history = useHistory();

    const onClickHandler = () => {
        history.push(`hosts/${name}`);
    };

    return (
        <Container onClick={onClickHandler}>
            <HGName>{name}</HGName>
            <HGAlias>{alias}</HGAlias>
            <HGHosts>{strings.page.home.hosts}</HGHosts>
            <HostsContainer>
                {hosts.map(host => {
                    return <Host key={host}><HostName>{host}</HostName></Host>
                })}
            </HostsContainer>
        </Container>
    );

};

export default withLocalizeStrings(HostGroup);