import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Display from './components/Display';
import TextInput from './components/TextInput';

import './styles/App.css';

function App() {
  const ws = new WebSocket('ws://localhost:8080/chat');

  ws.addEventListener('open', function(event) {
    ws.send('Hello Server');
  });

  ws.addEventListener('message', event => {
    console.log(event.data);
  });

  return (
    <div className="container">
      <Header />
      <Display />
      <TextInput />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
