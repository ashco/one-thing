import React, { Component } from 'react';
import Main from './Main';
import History from './History';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <History />
      </div>
    );
  }
}

export default App;
