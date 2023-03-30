import './App.css';
import React, { useEffect, useState } from 'react';
import NavBar from './Components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import CardDetail from './Components/CardDetail/CardDetail';
import CreateActivity from './Components/Create Activity/CreateActivity';

function App() {
  return (
    <div className="App">
      {/* <Route path="/" component={NavBar} /> */}
      <Route exact path="/countries" component={Home} />      
      <Route path="/countries/:id" component={CardDetail} />      
      <Route path="/create_activity" component={CreateActivity} />      
    </div>
  );
}

export default App;
