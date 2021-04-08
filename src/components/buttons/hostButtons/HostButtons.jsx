import styled from 'styled-components';
import HostButton from './hostButton/HostButton';
import { Flex } from 'reflexbox/styled-components';
import deleteIcon from '../../../assets/delete.png';
import pencilIcon from '../../../assets/pencil.png';
import settingIcon from '../../../assets/settings.png';

const Container = styled(Flex)`
    flex-direction: column;
    width: 100%;
`;

const HostButtons = ({onDeleteHandler, onShowInfoHandler}) => {

    const onUpdateHandler = () => {
        console.log('update host');
    }

    return (
        <Container>
            <HostButton onClick={onDeleteHandler} icon={deleteIcon} />
            <HostButton onClick={onUpdateHandler} icon={pencilIcon} />
            <HostButton onClick={onShowInfoHandler} icon={settingIcon} />
        </Container>
    );
};

export default HostButtons;