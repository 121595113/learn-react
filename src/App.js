import React from 'react';
import ChildComponent from './child'
import Icon from '@components/d2-icon'
import IconSvg from '@components/iconSvg'
import { Abc } from './Mycontext'
import logo from './logo.svg';

import './App.css';

function App() {
  console.log(111, process.env.REACT_APP_NOT_SECRET_CODE)
  return (
    <div className="App">
      <Icon name="clock-o" style={{color: 'red'}}/>
      <IconSvg name="add" width="40" height="40"/>
      <Abc.Provider value={{a: 1, b: 2}}>
        <ChildComponent/>
      </Abc.Provider>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
