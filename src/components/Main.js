import React from 'react';
import PropTypes from 'prop-types';
import { formatMain } from '../helpers/helpers';


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
      input: '',
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
    const { onDelete } = this.props;

    this.setState(() => ({ input: '' }));

    onDelete(0);
  }

  handleComplete = (event) => {
    event.preventDefault();
    const { onComplete } = this.props;

    this.setState(() => ({ input: 'Great job! See you tomorrow.' }));

    onComplete(0);
  }

  render () {
    const { input, maxLimit } = this.state;
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