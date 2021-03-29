import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../../languages/Localize';

const StyledButton = styled(Flex)`
    width: 28rem;
    border: .1rem solid gainsboro;
    border-radius: 1rem;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
    cursor: pointer;
    font-size: 1.5rem;
    &: hover {
        background-color: gray;
        color: white;
    }

`;

const Space = styled(Flex)`
    width: 17.5rem;
`;

const Container = styled(Flex)`
    margin-top: 1.2rem;
    width: 100%;
`;

const PageAddHostButton = ({strings, onClickHandler}) => {

    return (
        <Container>
            <Space />
            <StyledButton onClick={onClickHandler}>{strings.buttons.add}</StyledButton>
        </Container>
    );
};

export default withLocalizeStrings(PageAddHostButton);
