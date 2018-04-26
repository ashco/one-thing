import React from 'react';
import { formatMain } from '../helpers/helpers';

function Date (props) {
  const { unix } = props;
  const date = formatMain(unix);

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

    const { unix, onSubmit } = this.props;
    const { todo } = this.state;

    onSubmit(unix, todo, false);
  }

  handleReset = (event) => {
    event.preventDefault();
    const { onReset } = this.props;

    this.setState(() => ({
      todo: ''
    }));
    onReset();
  }

  handleComplete = (event) => {
    event.preventDefault();
    const { onComplete } = this.props;

    onComplete(0);
  }

  render () {
    const { todayTodo } = this.props;
    const { todo } = this.state;

    return (
      <form className='column' onSubmit={this.handleSubmit} >
        <input
          type='text'
          id='todo'
          placeholder='What will you to do today?'
          value={this.state.todo}
          onChange={this.handleChange}
          disabled={todayTodo}
        />
        {todayTodo
          ? <div>
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
            </div>
          : <div>
              <button
                className='button'
                type='submit'
                disabled={!todo}>
                Set
              </button>
            </div>}
      </form>
    )
  }
}


class Main extends React.Component {
  render () {
    const { unix, todayTodo, onSubmit, onReset, onComplete } = this.props;

    return (
      <div className="Main column">
        <Date unix={unix} />
        <Form unix={unix} todayTodo={todayTodo} onSubmit={onSubmit} onReset={onReset} onComplete={onComplete} />
      </div>
    )
  }
}

export default Main;