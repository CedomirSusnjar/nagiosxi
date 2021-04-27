import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    width: 100%;
    font-size: 2.2rem;
    height: 5rem;
    padding-top: 2rem;
    padding-left: 2rem;
`;

const Title = ({text}) => {
    return ( <Container>{text}</Container>);
};

export default Title;