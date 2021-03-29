import styled from 'styled-components';
import {withLocalizeStrings} from '../../languages/Localize';
import { Flex } from 'reflexbox/styled-components';

const StyledFooter = styled(Flex)`
    position: fixed;
    bottom: 0;
    z-index: 100;
    height: 4rem;
    width: 100%;
    background-color: gainsboro;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
`;

const Footer = ({strings}) => {

    return (
        <StyledFooter>{strings.footer.text}</StyledFooter>
    );

};

export default withLocalizeStrings(Footer);