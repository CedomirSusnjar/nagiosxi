import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledInput = styled.input`
    border-radius: 1rem;
    width: 28rem;
    height: 3.5rem;
    outline: none;
    border: .1rem solid gainsboro;
    padding-left: 1rem;
`;

const Container = styled(Flex)`
    flex-direction: row;
    margin-left: 1.6rem;
    margin-top: 1.2rem;
`;

const Text = styled(Flex)`
    font-size: 1.4rem;
    width: 20rem;
    vertical-align: center;
`;

const Input = ({text, onChange}) => {

    return (
        <Container>
            <Text>{text}</Text>
            <StyledInput onChange={onChange}/>
        </Container>
    );
    
};

export default Input;