import React from 'react';
import PropTypes from 'prop-types';
import { formatMain, streakCalc } from '../helpers/helpers';

export function Date (props) {
  const { currentUnix } = props;
  const date = formatMain(currentUnix);

  return <h2>{date}</h2>;
}

Date.propTypes = {
  currentUnix: PropTypes.number.isRequired
}

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: ''
    }
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
    const { input } = this.state;
    const { todayTodo } = this.props;

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <input
          type='text'
          id='input'
          placeholder='What will you to accomplish today?'
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
  currentUnix: PropTypes.number.isRequired ,
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
      streak: 0
    }
  }

  render () {
    const { currentUnix, todayTodo, streak, handleStreak, onSubmit, onDelete, onComplete } = this.props;

    return (
      <div className="Main">
        <h1>One Thing</h1>
        <Date currentUnix={currentUnix} />
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
            <p>{streak > 1 ? `${streak} days in a row! Great job!` : 'Great job! See you tomorrow.'}</p>
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