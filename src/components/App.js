import React, { Component } from 'react';
import Main from './Main';
import History from './History';
import { getCurrentUnix, sameDateCheck } from '../helpers/helpers';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [
        {
          unix: 1044711086746,
          text: 'Get a job',
          status: false
        },{
          unix: 1424711086746,
          text: 'Eat a pizza',
          status: true
        }
      ]
    }
  }


  handleSubmit = (unix, value, status) => {
    this.setState(() => ({
      todos: [{
        unix,
        text: value,
        status
      }, ...this.state.todos]
    }))
  }

  handleReset = () => {
    const newState = this.state.todos.slice(1);

    this.setState(() => ({
      todos: newState
    }));
  }

  handleComplete = (index) => {
    const newState = this.state.todos;
    newState[index].status = true;

    this.setState(() => ({
      todos: newState
    }))
  }


  render() {
    const { todos } = this.state;
    const currentUnix = getCurrentUnix();
    const todayTodo = sameDateCheck(currentUnix, todos[0].unix);




    return (
      <div className="App">
        <Main unix={currentUnix} todayTodo={todayTodo} onSubmit={this.handleSubmit} onReset={this.handleReset} onComplete={this.handleComplete} />
        <History data={todos} currentUnix={currentUnix} />
      </div>
    );
  }
}

export default App;
