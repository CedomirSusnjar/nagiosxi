import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from './router/MRouter';
import ApplicationProvider from './application/Application';
import Footer from './components/footer/Footer';
import GlobalStyle from './components/global-styles/GlobalStyle';
const App = () => {

  return (

    <BrowserRouter>
    <GlobalStyle />
      <ApplicationProvider>
        <Toolbar />
        <MRouter />
        <Footer />
      </ApplicationProvider>
    </BrowserRouter>

  );
}

export default App;
