import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledButton = styled(Flex)`
    align-items: center;
    width: 50%;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
    &:hover {
        background-color: silver;
    }
    cursor: pointer;
`;

const Icon = styled(Flex)`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
`;

const ServiceButton = ({icon, onClick, style}) => {
    return (
        <StyledButton onClick={onClick} style={style}>
            <Icon icon={icon}/>
        </StyledButton>
    );
};

export default ServiceButton;