import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreateRecipe from './Components/CreateRecipe/CreateRecipe';
import DetailsRecipe from './Components/DetailsRecipe/DetailsRecipe';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={ <LandingPage/> }/>
          <Route path = '/home' element={ <Home/> }/>
          <Route path = '/recipes' element={ <CreateRecipe/> }/>
          <Route path = '/recipes/:id' element = {<DetailsRecipe/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
