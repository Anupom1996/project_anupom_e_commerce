import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import AppRoute from './router/appRoute'
import HomePageNavigation from './components/HomePageNavigation/navigation'
import { Route, Switch } from 'react-router-dom'
import  {BrowserRouter} from 'react-router-dom'
import Router from './router/appRoute'
import appRoute from './router/appRoute';

function App() {
  return (
  
    <div className="App">
        <BrowserRouter>
            <AppRoute></AppRoute>
         </BrowserRouter>
      
    </div>
   
  );
}

export default App;
