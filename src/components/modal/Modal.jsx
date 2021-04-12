import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../languages/Localize';

const ModalContainer = styled(Flex)`
    flex-direction: column;
    position: fixed;
    margin: 0 auto;
    top: 25rem;
    width: 40rem;
    height: 20rem;
    background-color: white;
    z-index: 500;
    border-radius: 2rem;
`;

const Container = styled(Flex)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 500;
`;

const Question = styled(Flex)`
    width: 100%;
    height: 70%;
    font-size: 1.8rem;
    color: black;
    z-index: 500;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Backdrop = styled(Flex)`
    background-color: black;
    opacity: 0.2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 400;
    click: pointer;
`;

const Buttons = styled(Flex)`
    flex-direction: row;
    width: 100%;
    height: 15%;
    justify-content: center;
`;

const Button = styled(Flex)`
    width: 30%;
    background-color: white;
    color: gray;
    font-weight: bold;
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 2rem;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    border: 2px solid gray;
    cursor: pointer;
    &:hover {
        background-color: gray;
        color: white;
    }
`;

const Modal = ({strings, show, confirm, decline, question}) => {

    return (
        show && ( <>
            <Backdrop />{//nece da se klikne pozadina, mozda nesto oko z-indexa, nez
            }
            <Container onClick={decline}>
                <ModalContainer>
                    <Question>{question}</Question>
                    <Buttons>
                        <Button onClick={confirm}>{strings.page.hosts.yes}</Button>
                        <Button onClick={decline}>{strings.page.hosts.no}</Button>
                    </Buttons>
                </ModalContainer>
            </Container>
        </>
        )
    );

};

export default withLocalizeStrings(Modal);