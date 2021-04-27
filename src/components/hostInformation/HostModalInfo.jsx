import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    justify-content: left;
    padding-left: 1.4rem;
    margin-top: .1rem;
    width: 100%;
`;

const Property = styled.label`
    font-weight: bold;
    font-size: 1.3rem;
    width: 50%;
    padding-top: .5rem;
    word-wrap: break-word;
`;

const Value = styled.label`
    font-size: 1.3rem;
    width: 50%;
    word-wrap: break-word;
    text-align: left;
    padding-top: .5rem;
    text-align: left;
`;

const HostModalInfo = ({ text, value }) => {

    return (
        <Container>
            <Property>{`${text}:`}</Property>
            <Value>{value}</Value>
        </Container>
    );

};

export default HostModalInfo;