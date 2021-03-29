import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';
import NavigationLink from '../navigationLink/NavigationLink';
import { useHistory } from 'react-router-dom';
import {withLocalizeStrings} from '../../../languages/Localize';
import { useApplicationStateValue } from '../../../application/Application';

const Container = styled(Flex)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
    align-items: center;
    background-color: gainsboro;
    z-index: 100;
`;

const Space = styled(Flex)`
    flex-grow: 1;
`;

const SignInOut = styled(NavigationLink)`
    position: absolute;
    top:0;
`;

const Toolbar = ({strings}) => {

    let { authorized, setAuthorized} = useApplicationStateValue();

    let history = useHistory();//text underline sa history location pathname includes 

    const onClickHandler = (path) => {
        history.push(path);
    }

    const onLogOut = () => {
        setAuthorized(false);
        history.push("/login");
    }

    return (
        <Container> 
            {
             authorized &&   <>
            <NavigationLink onClick={() => {onClickHandler("/home")}} text={strings.page.toolbar.homepage} />
            <NavigationLink onClick={() => {onClickHandler("/hosts")}} text={strings.page.toolbar.hosts}/>
            <NavigationLink onClick={() => {onClickHandler("/services")}} text={strings.page.toolbar.services}/>
            <Space /> 
            <SignInOut onClick={onLogOut} text="Odjava"/>
            </>}
        </Container>
    );
    
};

export default withLocalizeStrings(Toolbar);