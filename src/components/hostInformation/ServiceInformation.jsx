import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    justify-content: left;
    margin-top: .1rem;
    flex-direction: column;
`;

const Property = styled.label`
    font-weight: bold;
    margin-right: .8rem;
    font-size: 1rem;
    width: 100%;
    padding-left: .6rem;
`;

const Value = styled.label`
    font-size: 1rem;
    width: 100%;
    word-wrap: break-word;
    text-align: left;
    padding-left: .6rem;
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