import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledButton = styled(Flex)`
    height: 33%;
    width: 100%;
    position: relative;
`;

const Icon = styled(Flex)`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    width: 100%;
    height: 30%;
    position: absolute;
    top: 50%;
    left: 7px;
`;

const HostButton = ({icon, onClick}) => {
    return (
        <StyledButton>
            <Icon onClick={onClick} icon={icon}/>
        </StyledButton>
    );
};

export default HostButton;