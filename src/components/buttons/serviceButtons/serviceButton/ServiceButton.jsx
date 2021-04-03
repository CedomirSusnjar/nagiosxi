import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledButton = styled(Flex)`
    align-items: center;
    width: 34%;
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

const ServiceButton = ({icon, onClick}) => {
    return (
        <StyledButton>
            <Icon onClick={onClick} icon={icon}/>
        </StyledButton>
    );
};

export default ServiceButton;