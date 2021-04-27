import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import NavigationLink from '../navigationLink/NavigationLink';
import { useHistory } from 'react-router-dom';
import { withLocalizeStrings } from '../../../languages/Localize';
import { useApplicationStateValue } from '../../../application/Application';
import { basicColor } from '../../../common/config/config';

const Container = styled(Flex)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
    align-items: center;
    background-color: ${basicColor};
    z-index: 100;
`;

const Space = styled(Flex)`
    width: 55%;
`;

const Toolbar = ({ strings }) => {

    let { authorized, setAuthorized, username } = useApplicationStateValue();

    let history = useHistory();

    const onClickHandler = (path) => { history.push(path); }

    const onLogOut = () => {
        setAuthorized(false);
        history.push("/login");
    }

    return (
        <Container>
            {
                authorized && <>
                    <NavigationLink onClick={() => { onClickHandler("/home") }} text={strings.page.toolbar.homepage} />
                    <NavigationLink onClick={() => { onClickHandler("/hosts") }} text={strings.page.toolbar.hosts} />
                    <NavigationLink onClick={() => { onClickHandler("/services") }} text={strings.page.toolbar.services} />
                    <Space />
                    <NavigationLink style={{ position: "absolute", right: "2rem" }} onClick={onLogOut} text={`${strings.page.toolbar.logout} (${username})`} />
                </>}
        </Container>
    );

};

export default withLocalizeStrings(Toolbar);