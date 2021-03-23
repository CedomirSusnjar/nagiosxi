import styled from 'styled-components';
import Signal from './Signal';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    flex-direction: row;
    height: 15%;
    justify-content: center;
`;
console.log('Signals');

const Signals = (props) => {

    return (
        <Container>
            <Signal color="red"/>
            <Signal color="green"/>
            <Signal color="yellow"/>
            <Signal color="orange"/>
        </Container>
    );

};

export default Signals;