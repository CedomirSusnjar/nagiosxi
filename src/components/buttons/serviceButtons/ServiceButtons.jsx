import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButton from './serviceButton/ServiceButton';
import deleteIcon from '../../../assets/delete.png';
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
            <ServiceButton onClick={onDelete} icon={deleteIcon} style={{borderRight: ".1rem solid silver"}}/>
            <ServiceButton onClick={onShowInfo}icon={settingIcon} />
        </Container>
    );

};

export default ServiceButtons;