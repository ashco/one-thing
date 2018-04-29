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
          unix: 1424711086746,
          text: 'Eat double chicken wings',
          status: true
        },{
          unix: 1044711086746,
          text: 'Get a job',
          status: false
        },{
          unix: 1324711086746,
          text: 'Build a house',
          status: true
        },{
          unix: 1454711086746,
          text: 'Follow the dreams of your childhood. Be merry, and eat lots of playdough',
          status: false
        },
        {
          unix: 1424711086746,
          text: 'Eat double chicken wings',
          status: true
        },{
          unix: 1044711086746,
          text: 'Get a job',
          status: false
        },{
          unix: 1324711086746,
          text: 'Build a house',
          status: true
        },{
          unix: 1454711086746,
          text: 'Follow the dreams of your childhood. Be merry, and eat lots of playdough',
          status: false
        },
        {
          unix: 1424711086746,
          text: 'Eat double chicken wings',
          status: true
        },{
          unix: 1044711086746,
          text: 'Get a job',
          status: false
        },{
          unix: 1324711086746,
          text: 'Build a house',
          status: true
        },{
          unix: 1454711086746,
          text: 'Follow the dreams of your childhood. Be merry, and eat lots of playdough',
          status: false
        }
      ],
      deleted: {

      }
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

    this.setState(() => ({ todos: newState }));
  }

  handleComplete = (index) => {
    const newState = this.state.todos;
    newState[index].status = true;

    this.setState(() => ({ todos: newState }))
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
          todayTodo={todayTodo}
          onComplete={this.handleComplete}
          onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
