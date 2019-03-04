const app = require('express')();
const server = require('http').Server(app);
// const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const path = require('path');

const PORT = process.env.SERVER_PORT || 5000;

app.use(cors());

io.on('connection', socket => {
  console.log('a user connected');
  socket.broadcast.emit('message', { id: 42 });
  socket.on('message', data => {
    console.info(data);
  });
});

/**
 * Error handler middleware.
 */
app.use((err, req, res, next) => {
  switch (err.name) {
    case 'redis.RedisError':
      console.log(err.stack);
      return res.status(500).json({ message: "it's really broked" });

    case 'Error':
      console.log(err.stack);
      return res.status(404).json({ message: 'It is broked' });
  }
});

/**
 * Default server port is 5000.
 */
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
