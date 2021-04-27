import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { basicColor } from '../../../common/config/config';

const StyledButton = styled.button`
    margin-left: 1.5rem;
    border: none;
    width: 16rem;
    border-radius: 1rem;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    background-color: ${basicColor};
    font-size: 1.5rem;
    cursor: pointer;
    color: black;
    :disabled {
        cursor: no-drop;
        background-color: ${basicColor};
        color: white;
    }
    &: hover {
        background-color: gray;
        color: white;
    }
    &: hover[disabled] {
        cursor: no-drop;
        background-color: ${basicColor};
        color: white;
    }
    outline: none;
    height: 3rem;
`;

const Container = styled(Flex)`
    margin-left: 1rem;
`;

const PageAddHostButton = ({ disabled, text }) => {

    return (
        <Container>
            <StyledButton disabled={disabled}>{text}</StyledButton>
        </Container>
    );
};

export default PageAddHostButton;
