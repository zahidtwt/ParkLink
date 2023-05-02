const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const authRouter = require('./router/authRoute');
const appRouter = require('./router/appRoute');
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require('./config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//***middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // tiny log of my requests
app.disable('x-powered-by'); // less hackers know about our stack

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

module.exports = app;
