import styled from 'styled-components';
import {withLocalizeStrings} from '../../languages/Localize';
import { Flex } from 'reflexbox/styled-components';
import { basicColor } from '../../common/config/config';

const StyledFooter = styled(Flex)`
    position: fixed;
    bottom: 0;
    z-index: 100;
    height: 2.5rem;
    width: 100%;
    background-color: ${basicColor};
    align-items: center;
    justify-content: center;
    font-size: 1rem;
`;

const Footer = ({strings}) => {

    return ( <StyledFooter>{strings.footer.text}</StyledFooter>);
    
};

export default withLocalizeStrings(Footer);