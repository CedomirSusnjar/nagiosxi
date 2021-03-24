import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from './router/MRouter';
import ApplicationProvider from './application/Application';

const App = () => {

  return (
    <BrowserRouter>
      <ApplicationProvider>
        <Toolbar></Toolbar>
        <MRouter />
      </ApplicationProvider>
    </BrowserRouter>
  );
}

export default App;
