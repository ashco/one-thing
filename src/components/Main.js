import React from 'react';
import { formatMain, sameDateCheck } from '../helpers/helpers';

function Date (props) {
  const { currentUnix } = props;
  const date = formatMain(currentUnix);

  return (
    <h2>{date}</h2>
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
      todo: 'Great job! See you tomorrow.'
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
          placeholder='What will you to accomplish today?'
          value={todo}
          onChange={this.handleChange}
          disabled={todayTodo !== false}
        />
        <div className='btn-container'>
        {todayTodo === false &&
            <button
              className='btn-large btn-set'
              type='submit'
              style={{backgroundColor: !todo ? 'var(--gray-color)' : ''}}
              disabled={!todo}>
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
        {/* {todayTodo === 'complete' &&
            <button
              className='btn-small btn-chk'
              onClick={this.handleReset}>
              ✕
            </button>} */}
          </div>
      </form>
    )
  }
}

function Main (props) {

  const { currentUnix, todayTodo, onSubmit, onDelete, onComplete } = props;

  return (
    <div className="Main">
      <Date currentUnix={currentUnix} />
      {/* {todayTodo !== 'complete' && */}
      <Form
        currentUnix={currentUnix}
        todayTodo={todayTodo}
        onSubmit={onSubmit}
        onDelete={onDelete}
        onComplete={onComplete} />
      {/* {todayTodo === 'complete' &&
        <p className='complete-msg'>Great job! See you tomorrow.</p>} */}
      <div>
        <h2 className='quote'>Motivational quote goes here...</h2>
      </div>
    </div>
  )
}

export default Main;