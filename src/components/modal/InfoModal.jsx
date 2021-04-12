import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import closeImg from '../../assets/close.png';
import HostModalInfo from '../hostInformation/HostModalInfo';

const ModalContainer = styled(Flex)`
    flex-direction: column;
    position: fixed;
    margin: 0 auto;
    top: 8rem;
    width: 120rem;
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
    background-color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    justify-content: center;
    align-items: center;
    &: hover {
        border: .2rem solid red;
    }
    cursor: pointer;
`;

const CloseImg = styled(Flex)`
    background-image: url(${closeImg});
    width: 1.6rem;
    height: 1.6rem;
    background-repeat: no-repeat;
`;

const InfoBlock = styled(Flex)`
    position: absolute;
    top: 5rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    border: .05rem solid gainsboro;
    border-radius: 2rem;
    flex-direction: row;
`;

const InfoColumn = styled(Flex)`
    flex-direction: column;
    width: 40rem;
`;

const InfoModal = ({ strings, show, confirm, decline, question, data }) => {

    data = Object.entries(data);

    return (
        show && <>
            <Backdrop />
            <Container onClick={decline}>
                <ModalContainer>
                    <Close onClick={decline}><CloseImg /></Close>
                    <InfoBlock>
                        <InfoColumn>{data.slice(0, (data.length / 3)).map(info => { return <HostModalInfo text={info[0]} value={info[1]} /> })}</InfoColumn>
                        <InfoColumn>{data.slice((data.length / 3), 2 * (data.length / 3)).map(info => { return <HostModalInfo text={info[0]} value={info[1]} /> })}</InfoColumn>
                        <InfoColumn>{data.slice(2 * (data.length / 3), 3 * (data.length / 3)).map(info => { return <HostModalInfo text={info[0]} value={info[1]} /> })}</InfoColumn>
                    </InfoBlock>
                </ModalContainer>
            </Container>
        </>
    );
};

export default InfoModal;