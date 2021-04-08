import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import closeImg from '../../assets/close.png';

const ModalContainer = styled(Flex)`
    flex-direction: column;
    position: fixed;
    margin: 0 auto;
    top: 8rem;
    width: 80rem;
    height: 60rem;
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
    z-index: 500;
    click: pointer;
`;

const Close = styled(Flex)`
    width: 3rem;
    height: 3rem;
    border-radius: 20rem;
    background-color: crimson;
    position: absolute;
    top: 1rem;
    right: 1rem;
    justify-content: center;
    align-items: center;
    &: hover {
        background-color: red;
    }
    cursor: pointer;
`;

const CloseImg = styled(Flex)`
    background-image: url(${closeImg});
    width: 1.6rem;
    height: 1.6rem;
    background-repeat: no-repeat;
`;

const HostModal = ({strings, show, confirm, decline, question}) => {

    return (
        show && <>
            <Backdrop />
            <Container onClick={decline}>
                <ModalContainer>
                    <Close onClick={decline}>
                        <CloseImg />
                    </Close>
                </ModalContainer>
            </Container>
        </>
    );

};

export default HostModal;