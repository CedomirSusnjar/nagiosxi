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

const HostButtons = ({onDeleteHandler, onShowInfoHandler, onUpdateHandler}) => {

    return (
        <Container>
            <HostButton onClick={onDeleteHandler} icon={deleteIcon} />
            <HostButton onClick={onUpdateHandler} icon={pencilIcon} style={{borderBottom: ".05rem solid silver",borderTop: ".05rem solid silver"}}/>
            <HostButton onClick={onShowInfoHandler} icon={settingIcon} />
        </Container>
    );
};

export default HostButtons;  