import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    height: 100%;
    width: 20%;
    border-radius: .5rem;
    margin-left: .5rem;
    margin-right: .5rem;
    background-color: ${props => props.color};
`;

console.log('Signal');

const Signal = ({color}) => {

    return (
        <Container color={color} />
    );

};

export default Signal;