import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButton from './serviceButton/ServiceButton';
import deleteIcon from '../../../assets/delete.png';
import pencilIcon from '../../../assets/pencil.png';
import settingIcon from '../../../assets/settings.png';

const Container = styled(Flex)`
    flex-direction: row;
    width: 100%;
    height: 2.5rem;
    margin: 0 auto;
    overflow: hidden;
    position: absolute;
    bottom: 0;
`;

const ServiceButtons = ({onDelete, onShowInfo}) => {
    return (
        <Container>
            <ServiceButton icon={pencilIcon} />
            <ServiceButton onClick={onShowInfo}icon={settingIcon} style={{borderLeft: ".05rem solid silver",borderRight: ".05rem solid silver"}}/>
            <ServiceButton onClick={onDelete} icon={deleteIcon} />
        </Container>
    );

};

export default ServiceButtons;