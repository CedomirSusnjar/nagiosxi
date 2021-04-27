import styled from 'styled-components';
import HostButton from './hostButton/HostButton';
import { Flex } from 'reflexbox/styled-components';
import deleteIcon from '../../../assets/delete.png';
import settingIcon from '../../../assets/settings.png';

const Container = styled(Flex)`
    flex-direction: column;
    width: 100%;
`;

const HostButtons = ({ onDeleteHandler, onShowInfoHandler }) => {

    return (
        <Container>
            <HostButton onClick={onDeleteHandler} icon={deleteIcon} style={{ borderBottom: ".1rem solid silver" }} />
            <HostButton onClick={onShowInfoHandler} icon={settingIcon} />
        </Container>
    );
};

export default HostButtons;