const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('./database/connection');
const authRouter = require('./router/authRoute');
const appRouter = require('./router/appRoute');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'di31yslny',
  api_key: '353563475778261',
  api_secret: 'DZzF-pPefnAXmT8QSIbkgyxy16o',
});

//***middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // tiny log of my requests
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;
app.post('/upload', async (req, res) => {
  // console.log(req);
  try {
    const result = await cloudinary.uploader.upload(
      req.files.file.tempFilePath
    );
    res.json(result.secure_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err });
  }
});

app.get('/', (req, res) => {
  res.status(201).json('Home get request');
});
// api routers
app.use('/auth', authRouter);
app.use('/app', appRouter);

app.listen(port, () => {
  console.log(`🚀  http://localhost:${port}`);
});

module.exports = app;
