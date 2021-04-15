import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    height: 2rem;
    border: .1rem solid black;
    padding-left: .5rem;
    padding-right: .5rem;
    min-width: 4rem;
    justify-content: center;
    align-items: center;
    margin-left: .1rem;
    border-color: gainsboro;
    border-radius: .5rem;
    cursor: pointer;
    &:hover {
        background-color: lightblue;
        border-color: lightblue;
    }
    background-color: ${props => props.clicked ? 'lightblue' : 'white'}
`;

const Check = ({text, onClick}) => {

    return (
        <Container onClick={onClick} clicked={false}>
            {text}
        </Container>
    );
};

export default Check;