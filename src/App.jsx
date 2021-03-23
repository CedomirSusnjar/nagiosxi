import Toolbar from './components/navigation/toolbar/Toolbar';
import { BrowserRouter } from "react-router-dom";
import MRouter from './router/MRouter';

const App = () => {

  return (
    <BrowserRouter>
      <Toolbar></Toolbar>
      <MRouter />
    </BrowserRouter>
  );
}

export default App;
