import React from 'react';
import PropTypes from 'prop-types';
import { formatMain, streakCalc, centerHeader } from '../helpers/helpers';
import placeholderArr from '../helpers/placeholders';

class MainHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      welcome: true,
      showDate: false,
    }
  }

  welcomeTimeout = () => {
    setTimeout(() => {
      this.setState({ welcome: false })
      centerHeader();
    }, 7000);
  }

  dateTimeout = () => {
    setTimeout(() => {
      this.setState({ showDate: true })
      centerHeader();
    }, 10000);
  }

  componentDidMount = () => {
    centerHeader();
    this.welcomeTimeout();
    this.dateTimeout();
  }

  render () {
    const { welcome, showDate } = this.state;

    return (window.innerWidth >= 768
      ? <div className="Main--header">
          <div className="header-row">
            <h2 className={`first ${welcome ? 'visible' : 'hidden'}`}>What is the </h2>
            <h1 className="primary">One Thing</h1>
            <h2 className={`last ${welcome ? 'visible' : 'hidden'}`}> you can do</h2>
          </div>
          <div className="header-row">
            <h3 className={`first ${welcome ? 'visible' : 'hidden'}`}>to make </h3>
            <h2 className={`primary ${showDate || welcome ? 'visible' : 'hidden'}`}>{showDate ? <Date /> : 'today'}</h2>
            <h3 className={`last ${welcome ? 'visible' : 'hidden'}`}> a success?</h3>
          </div>
        </div>
      : <div className="Main--header">
          <Date />
        </div>);
  }
}


function Date (props) {
  const date = formatMain();

  return <span className="date">{date}</span>;
}


class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      placeholder: 'What will you to accomplish today?',
      input: '',
    }
  }

  componentDidMount = () => {
    const newPlaceholder = placeholderArr[Math.floor(Math.random() * placeholderArr.length)];

    this.setState({ placeholder: newPlaceholder })
  }

  handleChange = (event) => {
    const value = event.target.value;

    if (value.length >= 120) {
      console.log('Character Limit Reached');
      return;
    }
    this.setState(() => ({ input: value }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { currentUnix, onSubmit } = this.props;
    const { input } = this.state;

    onSubmit(currentUnix, input, false);
  }

  handleReset = (event) => {
    event.preventDefault();
    const { onDelete, handleStreak } = this.props;

    this.setState(() => ({ input: '' }));

    onDelete(0);
  }

  handleComplete = (event) => {
    event.preventDefault();
    const { onComplete, handleStreak } = this.props;

    this.setState(() => ({ input: 'Great job! See you tomorrow.' }));

    onComplete(0);
    handleStreak();
  }

  render () {
    const { input, placeholder } = this.state;
    const { todayTodo } = this.props;

    console.log(placeholder);

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <input
          type='text'
          id='input'
          placeholder={placeholder}
          value={input}
          style={{
            color: input ? 'var(--black-color)' : 'var(--gray-color)',
            borderColor: input ? 'var(--black-color)' : 'var(--gray-color)'
          }}
          onChange={this.handleChange}
          disabled={todayTodo !== false}
        />
        <div className='btn-container'>
        {todayTodo === false &&
          <button
            className='btn-large btn-set'
            type='submit'
            style={{backgroundColor: !input ? 'var(--gray-color)' : ''}}
            disabled={!input}>
            Set
          </button>}
        {todayTodo === 'incomplete' &&
          <div>
            <button
              className='btn-small btn-x'
              onClick={this.handleReset}>
              ✕
            </button>
            <button
              className='btn-small btn-chk'
              onClick={this.handleComplete}>
              ✓
            </button>
          </div>}
        </div>
      </form>
    )
  }
}

Form.propTypes = {
  currentUnix: PropTypes.number.isRequired,
  todayTodo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  onSubmit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      streak: 0,
    }
  }

  render () {
    const { currentUnix, todayTodo, streak, handleStreak, onSubmit, onDelete, onComplete } = this.props;

    return (
      <div className="Main">
        <MainHeader />
        {todayTodo !== 'complete' &&
          <Form
            currentUnix={currentUnix}
            todayTodo={todayTodo}
            handleStreak={handleStreak}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onComplete={onComplete} />}
        {todayTodo === 'complete' &&
          <div className='complete-msg'>
            <p>Great job! {streak > 1 ? `${streak} days in a row!` : 'Great job! See you tomorrow.'}</p>
          </div>}
          <div>
            <h2 className='quote'>Motivational quote here...</h2>
          </div>
      </div>
    )
  }
}

Main.propTypes = {
  currentUnix: PropTypes.number.isRequired,
  todayTodo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  handleStreak: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Main;