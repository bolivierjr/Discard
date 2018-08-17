import compression from 'compression';
import express from 'express';
import http from 'http';
import path from 'path';
import redis from 'redis';
import { promisify } from 'util';
import dotenv from 'dotenv/config';

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 8080;

// Compress response bodies for all requests
app.use(compression());

// Serve this build directory for prod
app.use(express.static(path.join(__dirname, '..', 'build/')));

// Catch-all route handler
app.get(
  '/*',
  promisify(async (req, res, next) => {
    res.sendFile(await path.resolve(__dirname, '..', 'build', 'index.html'));
  })
);

// Error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof redis.RedisError) {
    console.log(err.stack);
    return res.status(500).json({ message: "it's really broked" });
  } else if (err instanceof Error) {
    console.log(err.stack);
    return res.status(404).json({ message: 'It is broked' });
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://${process.env.REACT_APP_DOMAIN}:${PORT}...`);
});
