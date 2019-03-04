import React from 'react';
import Header from './Header';
import Display from './Display';
import TextInput from './TextInput';
import './styles/App.css';
import io from 'socket.io-client';

function App() {
  const a = 'yo mama';
  const socket = io('http://localhost:8080/');

  socket.on('connect', () => {
    console.log('User connected');
    socket.emit('message', { msg: 'yup' });
  });

  socket.on('message', data => {
    console.log(data);
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
