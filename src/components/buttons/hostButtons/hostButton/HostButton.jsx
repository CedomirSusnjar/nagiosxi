import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledButton = styled(Flex)`
    height: 50%;
    width: 100%;
    position: relative;
    &: hover {
        background-color: silver;
    }
`;

const Icon = styled(Flex)`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 45%;
    left: 25%;
`;

const HostButton = ({icon, onClick, style}) => {
    return (
        <StyledButton onClick={onClick} style={style}>
            <Icon icon={icon}/>
        </StyledButton>
    );
};

export default HostButton;