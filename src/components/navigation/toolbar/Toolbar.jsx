import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';
import NavigationLink from '../navigationLink/NavigationLink';
import { useHistory } from 'react-router-dom';
import {withLocalizeStrings} from '../../../languages/Localize';

const Container = styled(Flex)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    align-items: center;
    background-color: gainsboro;
`;

const Space = styled(Flex)`

`;

const SignInOut = styled(NavigationLink)`
position: absolute;
top:0;
`;

const Toolbar = ({strings}) => {

    let history = useHistory();

    const onClickHandler = (path) => {
        history.push(path);
    }
    
    return (
        <Container>
            <NavigationLink onClick={() => {onClickHandler("/")}} text={strings.page.toolbar.homepage} />
            <NavigationLink onClick={() => {onClickHandler("/hosts")}} text={strings.page.toolbar.hosts}/>
            <NavigationLink onClick={() => {onClickHandler("/services")}} text={strings.page.toolbar.services}/>
            <Space />
            <SignInOut onClick={() => {onClickHandler("/login")}} text="Odjava"/>
        </Container>
    );
    
};

export default withLocalizeStrings(Toolbar);