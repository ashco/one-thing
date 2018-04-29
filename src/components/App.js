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
      lastDelete: {

      },
      activeMain: true,
      activeHistory: true
    }
  }

  windowActivator = () => {
    if (window.innerWidth > 768) {
      this.setState({ activeHistory: true });
      return;
    }
    this.setState({ activeHistory: false })
  }

  toggleMain = () => {
    if (window.innerWidth <= 768 && this.state.activeHistory === true) {
      this.setState({ activeMain: true });
      return;
    }
    this.setState({ activeMain: false });

  }

  toggleHistory = () => {
    const toggle = !this.state.activeHistory;
    this.setState({ activeHistory: toggle })
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

  componentDidMount () {
    this.windowActivator();
    window.addEventListener('resize', this.windowActivator);
  }

  componentWillUnmount = () => window.removeEventListener('resize', this.windowActivator);

  render() {
    const { todos, activeMain, activeHistory } = this.state;
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
        {activeMain &&
          <Main
            currentUnix={currentUnix}
            todayTodo={todayTodo}
            onSubmit={this.handleSubmit}
            onComplete={this.handleComplete}
            onDelete={this.handleDelete} />}
          <History
            data={todos}
            todayTodo={todayTodo}
            activeMain={activeMain}
            activeHistory={activeHistory}
            toggleMain={this.toggleMain}
            toggleHistory={this.toggleHistory}
            onComplete={this.handleComplete}
            onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
