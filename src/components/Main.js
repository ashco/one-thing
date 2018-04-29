import React from 'react';
import PropTypes from 'prop-types';
import { formatMain, getQuote } from '../helpers/helpers';

let apiData = getQuote();
console.log(apiData);


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
      todo: '',
      maxLimit: true
   }
  }

  btnWarning () {

  }



  handleChange = (event) => {
    const value = event.target.value;

    if (value.length >= 120) {
      console.log('Character Limit Reached');
      return;
    }

    this.setState(() => ({ todo: value }));
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

    this.setState(() => ({ todo: '' }));

    onDelete(0);
  }

  handleComplete = (event) => {
    event.preventDefault();
    const { onComplete } = this.props;

    this.setState(() => ({ todo: 'Great job! See you tomorrow.' }));

    onComplete(0);
  }

  render () {
    const { todo, maxLimit } = this.state;
    const { todayTodo } = this.props;

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <input
          type='text'
          id='todo'
          placeholder='What will you to accomplish today?'
          value={todo}
          style={{
            color: todo ? 'var(--black-color)' : 'var(--gray-color)',
            borderColor: todo ? 'var(--black-color)' : 'var(--gray-color)'
          }}
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

function Main (props) {

  const { currentUnix, todayTodo, onSubmit, onDelete, onComplete } = props;

  return (
    <div className="Main">
      <Date currentUnix={currentUnix} />
      {todayTodo !== 'complete' &&
      <Form
        currentUnix={currentUnix}
        todayTodo={todayTodo}
        onSubmit={onSubmit}
        onDelete={onDelete}
        onComplete={onComplete} />}
      {todayTodo === 'complete' &&
      <div className='complete-msg'>
        <p>Great job! See you tomorrow.</p>
      </div>}
      <div>
        <h2 className='quote'>Motivational quote goes here...</h2>
      </div>
    </div>
  )
}

Main.propTypes = {
  currentUnix: PropTypes.number.isRequired,
  todayTodo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  onSubmit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Main;