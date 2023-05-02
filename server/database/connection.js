const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose.connection
  .on('open', () => console.log('Conneced with database'))
  .on('error', (error) => {
    console.log(error);
  });

async function connectToDatabase(db = 'parklink') {
  await mongoose.connect(`${MONGO_URI}/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectFromDatabase(db = 'parklink') {
  await mongoose.connect(`${MONGO_URI}/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
