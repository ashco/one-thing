import React from 'react';
import PastToDo from './PastToDo';

class History extends React.Component {


  render () {
    return (
      <div className="History column">
        <h1>History</h1>
        <PastToDo
          date={'Sept'}
          text={'Get a job'}
          status={true}
        />
        <PastToDo
          date={'Sept'}
          text={'Eat a good pizza'}
          status={false}
        />
      </div>
    )
  }
}

export default History;