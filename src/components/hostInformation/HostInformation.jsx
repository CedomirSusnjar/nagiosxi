import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    font-size: 10px;
    justify-content: left;
    height: 5%;
    padding-left: 14px;
    padding-top: 4px;
`;

const Text = styled.label`
    font-weight: bold;
    margin-right: 8px;
`;

const HostInformation = ({text, value}) => {

    return (
        <Container><Text>{text}</Text> {value}</Container>
    );

};

export default HostInformation;