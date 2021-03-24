import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    font-size: 10px;
    justify-content: left;
    height: 5%;
    padding-left: 14px;
`;

const HostInformation = ({text, value}) => {

    return (
        <Container>{text} {value}</Container>
    );

};

export default HostInformation;