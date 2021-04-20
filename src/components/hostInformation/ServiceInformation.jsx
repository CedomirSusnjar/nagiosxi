import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    justify-content: left;
    margin-top: .1rem;
    flex-direction: row;
`;

const Property = styled.label`
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
    padding-left: .6rem;
`;

const Value = styled.label`
    font-size: 1rem;
    width: 100%;
    word-wrap: break-word;
    text-align: left;
    margin-right: .4rem;
`;

const ServiceInformation = ({ text, value }) => {

    return (
        <Container>
            <Property>{text}</Property>
            <Value>{value}</Value>
        </Container>
    );
};

export default ServiceInformation;