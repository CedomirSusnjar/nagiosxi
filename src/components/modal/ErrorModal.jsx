import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import closeImg from '../../assets/close.png';

const ModalContainer = styled(Flex)`
    flex-direction: column;
    position: fixed;
    margin: 0 auto;
    top: 35%;
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

const Text = styled(Flex)`
    width: 100%;
    height: 100%;
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

const CloseImg = styled(Flex)`
    background-image: url(${closeImg});
    width: 1.6rem;
    height: 1.6rem;
    background-repeat: no-repeat;
`;

const Close = styled(Flex)`
    width: 3rem;
    height: 3rem;
    border-radius: 20rem;
    background-color: white;
    position: absolute;
    top: 1rem;
    z-index: 550;
    right: 1rem;
    justify-content: center;
    align-items: center;
    &: hover {
        border: .2rem solid red;
    }
    cursor: pointer;
`;

const ErrorModal = ({ show, decline, text }) => {

    const stopPropagation = (event) => { event.stopPropagation();}

    return (
        show && (<>
            <Backdrop />
            <Container onClick={decline}>
                <ModalContainer onClick={stopPropagation}>
                    <Close onClick={decline}><CloseImg /></Close>
                    <Text>{text}</Text>
                </ModalContainer>
            </Container>
        </>
        )
    );

};

export default ErrorModal;