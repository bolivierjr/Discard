import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import Display from './Display';
import TextInput from './TextInput';
import '../styles/App.css';

class App extends Component {
  render() {
    const socket = io.connect('http://localhost:8080');

    socket.on('join', data => {
      console.log(data);
      socket.emit('room', 'cars');
    });

    return (
      <div className="container">
        <Header />
        <Display />
        <TextInput />
      </div>
    );
  }
}

export default App;
