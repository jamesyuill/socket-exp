'use client';

import { useEffect, useState } from 'react';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3000/');

// socket.on('button-clicked', () => {
//   console.log('clicked by server');
// });

export default function Home() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    socket.emit('button-clicked', { count });
  }

  socket.on('increase', ({ data }) => {
    setCount(count + data.count);
  });

  useEffect(() => {
    document.getElementById('title').innerText = count;
  }, [count]);

  return (
    <>
      <h1>client side</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        click me
      </button>
      <p id="title"></p>
    </>
  );
}
