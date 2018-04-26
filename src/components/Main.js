import React from 'react';
import { formatMain, sameDateCheck } from '../helpers/helpers';

function Date (props) {
  const { currentUnix } = props;
  const date = formatMain(currentUnix);

  return (
    <h1 className='date'>{date}</h1>
  )
}

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: ''
    }
  }

  handleChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      todo: value
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { currentUnix, onSubmit } = this.props;
    const { todo } = this.state;

    onSubmit(currentUnix, todo, false);
  }

  handleReset = (event) => {
    event.preventDefault();
    const { onDelete } = this.props;

    this.setState(() => ({
      todo: ''
    }));

    onDelete(0);
  }

  handleComplete = (event) => {
    event.preventDefault();
    const { onComplete } = this.props;

    this.setState(() => ({
      todo: ''
    }));

    onComplete(0);
  }

  render () {
    const { todo } = this.state;
    const { todayTodo } = this.props;

    return (
      <form className='column' onSubmit={this.handleSubmit} >
        <input
          type='text'
          id='todo'
          placeholder='What will you to do today?'
          value={todo}
          onChange={this.handleChange}
          disabled={todayTodo !== false}
        />
        {todayTodo === false &&
          <button
            className='button'
            type='submit'
            disabled={!todo}>
            Set
          </button>}
        {todayTodo === 'incomplete' &&
          <div>
            <button
              className='button'
              onClick={this.handleReset}>
              Reset
            </button>
            <button
              className='button green'
              onClick={this.handleComplete}>
              Complete
            </button>
          </div>}
      </form>
    )
  }
}

function Main (props) {

  const { currentUnix, todayTodo, onSubmit, onDelete, onComplete } = props;

  return (
    <div className="Main column">
      <Date currentUnix={currentUnix} />
      {todayTodo !== 'complete' &&
        <Form
        currentUnix={currentUnix}
        todayTodo={todayTodo}
        onSubmit={onSubmit}
        onDelete={onDelete}
        onComplete={onComplete} />}
      {todayTodo === 'complete' &&
        <div>Great job! See you tomorrow.</div>}
    </div>
  )
}

export default Main;