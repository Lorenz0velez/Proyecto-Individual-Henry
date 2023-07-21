import './App.css';
import {React} from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import CardDetail from './Components/CardDetail/CardDetail';
import CreateActivity from './Components/Create Activity/CreateActivity';
import axios from 'axios';
import LandingPage from './Components/LandingPage/LandingPage';


// axios.defaults.baseURL = "http://localhost:3001/" ; 
axios.defaults.baseURL = "https://proyecto-individual-henry-production-b38e.up.railway.app/";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />      
      <Route exact path="/countries" component={Home} />      
      <Route path="/countries/:id" component={CardDetail} />      
      <Route path="/create_activity" component={CreateActivity} />     
    </div>
  );
}

export default App;
