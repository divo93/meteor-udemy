import React from 'react'
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

const App = () => {
  return (
    <div>
      React #2
    </div>
  )
}

Meteor.startup(() => {
  render(<App />, document.querySelector('#root'));
});