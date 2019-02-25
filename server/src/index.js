const compression = require('compression');
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const server = http.createServer(app);
const WebSocket = require('ws');
const PORT = process.env.SERVER_PORT || 5000;

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket, req) => {
  const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];

  socket.on('message', data => {
    socket.send(ip);
  });
});
/**
 * Compress response bodies for all requests.
 */
// app.use(compression());

/**
 * Serve this build directory for prod.
 */
// app.use(express.static(path.join(__dirname, '..', 'dist/')));

/**
 * Catch-all route handler.
 */
// app.get('/*', (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
// });

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
 * Default server port is 8080.
 */
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
