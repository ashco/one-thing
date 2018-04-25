import React from 'react';

function Date (props) {
  return (
    <h1>{props.date}</h1>
  )
}

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange () {

  }

  handleSubmit () {

  }

  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <input
          type='text'
          id='todo'
          placeholder='What will you to do today?'
          // autoComplete='off'
          value={this.state.todo}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.todo}>
          Submit
        </button>
      </form>
    )
  }
}






class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange () {

  }

  render () {
    return (
      <div className="Main column">
        <Date date={'October!!!!'}/>
        <Form />
      </div>
    )
  }
}

export default Main;