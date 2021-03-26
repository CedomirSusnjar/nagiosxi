import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from './router/MRouter';
import ApplicationProvider, { useApplicationStateValue } from './application/Application';
import Footer from './components/footer/Footer';
const App = () => {

  return (

    <BrowserRouter>
      <ApplicationProvider>
        <Toolbar />
        <MRouter />
        <Footer />
      </ApplicationProvider>
    </BrowserRouter>

  );
}

export default App;
