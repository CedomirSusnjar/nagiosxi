import styled from 'styled-components';
import Host from './components/host/Host';
import { Flex } from 'reflexbox/styled-components';
import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from './router/MRouter';
import Home from './pages/home/Home';

const App = () => {

  return (
    <BrowserRouter>
      <Toolbar></Toolbar>
      <MRouter />
    </BrowserRouter>
  );
}

export default App;
