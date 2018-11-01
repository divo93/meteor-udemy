import React from 'react'
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ImageList from './components/image_list'

const App = () => {
  return (
    <div>
      <ImageList />
    </div>
  )
}

Meteor.startup(() => {
  render(<App />, document.querySelector('#root'));
});