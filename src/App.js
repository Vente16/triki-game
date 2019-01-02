import React, { Component } from 'react';
import Game from './components/Game';

import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <p className="title-app">TRIKI GAME</p>
        </header>
         <Game/>
      </div>
    );
  }
}

export default App;
