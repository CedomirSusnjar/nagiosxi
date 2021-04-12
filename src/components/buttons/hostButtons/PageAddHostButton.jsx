import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../../languages/Localize';

const StyledButton = styled.button`
    width: 28rem;
    border: .1rem solid gainsboro;
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
`;

const Space = styled(Flex)`
    width: 21.5rem;
`;

const Container = styled(Flex)`
    margin-top: 1.2rem;
    width: 100%;
`;

const PageAddHostButton = ({strings, onClickHandler, disabled}) => {

    return (
        <Container>
            <Space />
            <StyledButton disabled={disabled} onClick={onClickHandler}>{strings.buttons.add}</StyledButton>
        </Container>
    );
};

export default withLocalizeStrings(PageAddHostButton);
