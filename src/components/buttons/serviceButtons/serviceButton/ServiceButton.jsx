import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';

const StyledButton = styled(Flex)`
    align-items: center;
    width: 33.33%;
`;

const Icon = styled(Flex)`
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    width: 50%;
    height: 100%;
    margin: 0 auto;
`;


const ServiceButton = ({icon}) => {
    return (
        <StyledButton>
            <Icon icon={icon}/>
        </StyledButton>
    );
};

export default ServiceButton;