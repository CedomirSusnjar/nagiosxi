import styled from 'styled-components';
import Host from '../src/components/host/Host';
import { Flex } from 'reflexbox/styled-components';
import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from '../src/router/MRouter';

const Dashboard = styled(Flex)`
  position: absolute;
  flex-wrap: wrap;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
`;

function App() {
  return (
    <div>
      <Toolbar></Toolbar>
      <BrowserRouter>
        <MRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
