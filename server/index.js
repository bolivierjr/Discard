import dotenv from 'dotenv/config';
import sockets from './sockets';
import compression from 'compression';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const PORT = process.env.PORT || 8080;

/**
 * Compress response bodies for all requests.
 */
app.use(compression());

/**
 * Serve this build directory for prod.
 */
app.use(express.static(path.join(__dirname, '..', 'build/')));

/**
 * Catch-all route handler.
 */
app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
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
 * Socket listeners.
 */
sockets(io);

/**
 * Default server port is 8080.
 */
server.listen(PORT, () => {
  console.log(`Listening on http://${process.env.REACT_APP_DOMAIN}:${PORT}...`);
});
