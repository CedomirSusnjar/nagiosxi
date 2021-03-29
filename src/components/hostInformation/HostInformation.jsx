import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    font-size: 1rem;
    justify-content: left;
    height: 5%;
    padding-left: 1.4rem;
    padding-top: .4rem;
`;

const Text = styled.label`
    font-weight: bold;
    margin-right: .8rem;
    font-size: 1.1rem;
`;

const HostInformation = ({text, value}) => {

    return (
        <Container><Text>{text}</Text> {value}</Container>
    );

};

export default HostInformation;