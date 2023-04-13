const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('./database/connection');
const router = require('./router/route');
//***middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // tiny log of my requests
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

app.get('/', (req, res) => {
  res.status(201).json('Home get request');
});
// api routers
app.use('/api', router);

app.listen(port, () => {
  console.log(`🚀  http://localhost:${port}`);
});
