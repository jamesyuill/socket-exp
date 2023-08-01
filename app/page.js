'use client';

import { useRef, useState } from 'react';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3000/');
let user;
export default function Home() {
  const [message, setMessage] = useState('');
  const messageDiv = useRef();

  socket.on('connect', () => {
    user = socket.id;
  });

  socket.on('received-message', (fromServer) => {
    messageDiv.current.innerText = fromServer.message || '';
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(e.target.value);
    socket.emit('event', { message, user });
  };

  return (
    <>
      <form>
        <label htmlFor="username">Message: </label>
        <input
          type="text"
          id="username"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>submit</button>
      </form>
      <div ref={messageDiv}></div>
    </>
  );
}
