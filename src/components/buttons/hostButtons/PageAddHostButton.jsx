import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../../languages/Localize';

const StyledButton = styled.button`
    margin-left: 1.5rem;
    border: none;
    width: 16rem;
    border-radius: 1rem;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
    font-size: 1.5rem;
    cursor: pointer;
    &: hover {
        background-color: gray;
        color: white;
    }
    &: hover[disabled] {
        cursor: no-drop;
        background-color: gainsboro;
    }
    outline: none;
    height: 3rem;
`;

const Container = styled(Flex)`
    margin-left: 1rem;
`;

const PageAddHostButton = ({strings, onClickHandler, disabled}) => {

    return (
        <Container>
            <StyledButton disabled={disabled} onClick={onClickHandler}>{strings.buttons.add}</StyledButton>
        </Container>
    );
};

export default withLocalizeStrings(PageAddHostButton);
