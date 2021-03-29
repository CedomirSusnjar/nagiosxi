import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButton from './serviceButton/ServiceButton';
import deleteIcon from '../../../assets/delete.png';
import pencilIcon from '../../../assets/pencil.png';
import settingIcon from '../../../assets/settings.png';

const Container = styled(Flex)`
    flex-direction: row;
    width: 90%;
    height: 10%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin: 0 auto;
`;

const LeftServiceButton = styled(ServiceButton)`
    border-bottom-left-radius: 20px;
`;

const RightServiceButton = styled(ServiceButton)`
    border-bottom-right-radius: 20px;
`;

const ServiceButtons = ({onDelete}) => {
    return (
        <Container>
            <LeftServiceButton icon={pencilIcon} />
            <ServiceButton icon={settingIcon} />
            <RightServiceButton onClick={onDelete} icon={deleteIcon} />
        </Container>
    );

};

export default ServiceButtons;