import React from 'react';

function QuoteCard (props) {
  return (
    <div className='quote--container'>
      <h2 className='quote'>"One way or another, I'm gonna find ya' <br/>
      I'm gonna get ya', get ya', get ya', get ya'"</h2>
      <h3 className="quote--author">-Blondie</h3>
      {/* <h2 className='quote'>"I'm on One"</h2>
      <h3 className="quote--author">-Drake </h3> */}
    </div>
  )
}

export default QuoteCard;