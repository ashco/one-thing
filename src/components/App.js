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

  handleDelete = (index) => {
    const newState = this.state.todos;
    newState.splice(index, 1);

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
    let todayTodo = false;

    if (typeof todos[0] !== 'undefined') {
      todayTodo = sameDateCheck(currentUnix, todos[0].unix);
    }
    if (todayTodo && todos[0].status === false) {
      todayTodo = 'incomplete';
    }
    if (todayTodo && todos[0].status === true) {
      todayTodo = 'complete';
    }

    return (
      <div className="App">
        <Main
          currentUnix={currentUnix}
          todayTodo={todayTodo}
          onSubmit={this.handleSubmit}
          onComplete={this.handleComplete}
          onDelete={this.handleDelete} />
        <History
          data={todos}
          currentUnix={currentUnix}
          todayTodo={todayTodo}
          onComplete={this.handleComplete}
          onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
