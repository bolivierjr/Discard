export default async io => {
  io.on('connect', socket => {
    socket.emit('news', { hello: 'world' });

    socket.on('room', data => {
      socket.join(data);
      console.log(data);
    });
  });
};
