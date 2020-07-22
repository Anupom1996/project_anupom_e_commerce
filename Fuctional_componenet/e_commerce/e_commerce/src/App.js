import React from 'react';
import './App.css';
import { BrowserRouter ,Route} from 'react-router-dom'
import AppRouter from './Router/AppRouter'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <AppRouter/>
      </BrowserRouter>
    </div>
  );
}
export default App;
