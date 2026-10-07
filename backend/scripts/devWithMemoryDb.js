// Runs the API against an ephemeral, in-process MongoDB — no local MongoDB
// install or Atlas connection string required. Useful for first-time setup
// or quick local testing; production should point MONGODB_URI at a real
// MongoDB instance (local or Atlas) instead.
require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');

async function start() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri('restrowesite');
  console.log(`In-memory MongoDB started at ${process.env.MONGODB_URI}`);

  const shutdown = async () => {
    await mongod.stop();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  require('../server');
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
