import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    height: 100%;
    width: 15%;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
    background-color: ${props => props.color}
`;

console.log('Signal');

const Signal = ({color}) => {

    return (
        <Container color={color} />
    );

};

export default Signal;