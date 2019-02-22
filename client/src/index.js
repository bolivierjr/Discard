import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Display from './components/Display';
import TextInput from './components/TextInput';

import './styles/App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <Display />
      <TextInput />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
