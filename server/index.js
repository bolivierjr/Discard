import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'build/')));

app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send('it is broked');
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
