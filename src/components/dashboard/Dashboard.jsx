import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';

const Container = styled(Flex)`
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Dashboard = (props) => {
    
    return (
        <Container></Container>
    );
    
};

export default Dashboard;