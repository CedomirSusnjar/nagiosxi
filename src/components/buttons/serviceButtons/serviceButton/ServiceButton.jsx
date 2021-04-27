import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { basicColor } from '../../../../common/config/config';

const StyledButton = styled(Flex)`
    align-items: center;
    width: 50%;
    justify-content: center;
    align-items: center;
    background-color: ${basicColor};
    &:hover {
        background-color: silver;
    }
    cursor: pointer;
`;

const Icon = styled(Flex)`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    width: 1.6rem;
    height: 1.6rem;
`;

const ServiceButton = ({icon, onClick, style}) => {
    return (
        <StyledButton onClick={onClick} style={style}>
            <Icon icon={icon}/>
        </StyledButton>
    );
};

export default ServiceButton;