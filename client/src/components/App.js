import React from 'react';
import Header from './Header';
import Display from './Display';
import TextInput from './TextInput';
import '../styles/App.css';

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

export default App;
