import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    font-size: 1rem;
    justify-content: left;
    padding-left: 1.4rem;
    margin-top: .1rem;
`;

const Property = styled.label`
    font-weight: bold;
    margin-right: .8rem;
    font-size: 1.1rem;
    width: 50%;
`;

const Value = styled.label`
    margin-right: .8rem;
    font-size: 1.1rem;
    width: 50%;
`;

const HostInformation = ({ text, value }) => {

    return (
        <Container>
            <Property>{text}</Property>
            <Value>{value}</Value>
        </Container>
    );

};

export default HostInformation;