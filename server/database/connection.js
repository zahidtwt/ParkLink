const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose.connection
  .on('open', () => console.log('Conneced with database'))
  .on('error', (error) => {
    console.log(error);
  });

async function connectToDatabase() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
