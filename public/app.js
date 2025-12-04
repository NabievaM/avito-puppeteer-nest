const socket = io('https://seminars-clark-relative-flexible.trycloudflare.com/');

const ul = document.getElementById('messages');

socket.on('connect', () => {
  console.log('connected', socket.id);
});

socket.on('newMessage', (msg) => {
  const li = document.createElement('li');
  const time = new Date().toLocaleTimeString();
  li.textContent = `[${time}] ${msg.name}: ${msg.text}`;
  ul.prepend(li);
});

socket.on('disconnect', () => {
  console.log('disconnected');
});
