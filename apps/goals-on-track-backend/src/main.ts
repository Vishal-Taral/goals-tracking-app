import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'this is / page' });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to goals-on-track-backend!' });
});


// const port = process.env.PORT || 3333;
// const server = app.listen(3333, () => {
//   console.log(`Listening at http://localhost:${port}/`);
// });

// server.on('error', console.error);

export default app;
