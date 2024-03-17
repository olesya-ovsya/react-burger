import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerConstructor />
      <div>
        
      </div>
    </div>
  );
}

export default App;
