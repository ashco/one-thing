import React, { Component } from 'react';
import Main from './Main';
import History from './History';
import { getCurrentUnix, sameDateCheck, streakCalc, setLocalStorage, updateLocalStorage } from '../helpers/helpers';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        {
          unix: 1525158224820,
          text: 'Tooty Fruiti',
          status: true
        },{
          unix: 1525140679368,
          text: 'Eat double chicken wings',
          status: true
        },{
          unix: 1525018079368,
          text: 'Get a job',
          status: false
        },{
          unix: 1524908079368,
          text: 'Build a house',
          status: true
        },{
          unix: 1524440679368,
          text: 'Follow the dreams of your childhood. Be merry, and eat lots of playdough',
          status: false
        }
      ],
      streak: 0,
      activeMain: true,
      activeHistory: true,
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
      data: [{
        unix,
        text: value,
        status
      }, ...this.state.data]
    }));
    // updateLocalStorage(this.state.data);
  }

  handleDelete = (index) => {
    const newState = this.state.data;
    newState.splice(index, 1);

    this.setState(() => ({ data: newState }));

    // updateLocalStorage(this.state.data);
  }

  handleComplete = (index) => {
    const newState = this.state.data;
    newState[index].status = true;

    this.setState(() => ({ data: newState }))

    // updateLocalStorage(this.state.data);
  }

  handleStreak = () => {
    const { data } = this.state;

    const streak = streakCalc(data);
    this.setState({ streak });
  }

  componentDidMount () {
    // let data = setLocalStorage();
    // this.setState({ data: data })

    this.windowActivator();
    this.handleStreak();
    window.addEventListener('resize', this.windowActivator);
  }

  componentWillUnmount = () => window.removeEventListener('resize', this.windowActivator);

  render() {
    const { data, streak, activeMain, activeHistory } = this.state;
    const currentUnix = getCurrentUnix();
    let todayTodo = false;


    if (typeof data[0] !== 'undefined') {
      todayTodo = sameDateCheck(currentUnix, data[0].unix);
    }
    if (todayTodo && data[0].status === false) {
      todayTodo = 'incomplete';
    }
    if (todayTodo && data[0].status === true) {
      todayTodo = 'complete';
    }

    return (
      <div className="App">
        {activeMain &&
          <Main
            currentUnix={currentUnix}
            todayTodo={todayTodo}
            streak={streak}
            handleStreak={this.handleStreak}
            onSubmit={this.handleSubmit}
            onComplete={this.handleComplete}
            onDelete={this.handleDelete} />}
          <History
            data={data}
            todayTodo={todayTodo}
            activeMain={activeMain}
            activeHistory={activeHistory}
            handleStreak={this.handleStreak}
            toggleMain={this.toggleMain}
            toggleHistory={this.toggleHistory}
            onComplete={this.handleComplete}
            onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;