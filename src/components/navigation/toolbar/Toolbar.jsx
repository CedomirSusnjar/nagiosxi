import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';
import NavigationLink from '../navigationLink/NavigationLink';

const Container = styled(Flex)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    align-items: center;
    background-color: gainsboro;
`;

const Toolbar = (props) => {
    
    return (
        <Container>
            <NavigationLink text="Pocetna" />
            <NavigationLink text="Masine"/>
            <NavigationLink text="Servisi"/>
        </Container>
    );
    
};

export default Toolbar;