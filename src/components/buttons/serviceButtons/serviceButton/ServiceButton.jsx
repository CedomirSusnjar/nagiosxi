import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledButton = styled(Flex)`
    align-items: center;
    width: 33%;
    padding-left: 12px;
    padding-top: 2px;
    &:hover{
        box-shadow: -1px 2px 13px -2px rgba(0,0,0,0.75);
    }
    border-radius: 20px;
`;

const Icon = styled(Flex)`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
`;


const ServiceButton = ({icon, onClick}) => {
    return (
        <StyledButton>
            <Icon onClick={onClick} icon={icon}/>
        </StyledButton>
    );
};

export default ServiceButton;