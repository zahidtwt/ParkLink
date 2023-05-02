const app = require('./app');
const { PORT } = require('./config');
const { connectToDatabase } = require('./database/connection');

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`🚀  http://localhost:${PORT}`);
  });
}

startServer();
