import React, { Component } from 'react';
import Main from './Main';
import History from './History';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todoActive: {},
      todoHistory: [
        {
          date: 'April 3rd, 2018',
          text: 'Get a job',
          status: false
        },{
          date: 'April 13rd, 2018',
          text: 'Eat a pizza',
          status: true
        }
      ]
    }
  }

  render() {
    const data = this.state.todoHistory;

    return (
      <div className="App">
        <Main />
        <History data={data} />
      </div>
    );
  }
}

export default App;
