import styled from 'styled-components';
import HostButton from './hostButton/HostButton';
import { Flex } from 'reflexbox/styled-components';

const Container = styled(Flex)`
    flex-direction: column;
    width: 100%;
`;

const HostButtons = (props) => {


    const onDeleteHandler = () => {
        console.log('delete host');
    }

    const onUpdateHandler = () => {
        console.log('update host');
    }

    return (
        <Container>
            <HostButton onClick={onDeleteHandler} icon="images/delete.png" />
            <HostButton onClick={onUpdateHandler} icon="images/pencil.png" />
            <HostButton onClick={onDeleteHandler} icon="images/delete.png" />
        </Container>
    );
};

export default HostButtons;