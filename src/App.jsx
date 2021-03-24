import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from './router/MRouter';
import ApplicationProvider, { useApplicationStateValue } from './application/Application';

const App = () => {

  return (

    <BrowserRouter>
      <ApplicationProvider>
        <Toolbar />
        <MRouter />
      </ApplicationProvider>
    </BrowserRouter>

  );
}

export default App;
