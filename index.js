/* eslint-disable no-undef */
import CONFIG from "./src/config/db.js";
import "dotenv/config";
import mongoose from "mongoose";

import createServer from "./server.js";

const api = createServer();

/* start mongo*/
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

try {
  // Create a Mongoose client
  await mongoose.connect(CONFIG.MONGODB.URI, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Mongo Connection Established");

  api.listen(CONFIG.SERVER_PORT, () => {
    console.log(`Open server on port ${CONFIG.SERVER_PORT}`);
  });
} catch (error) {
  await mongoose.disconnect();
  console.log("Mongo Connection Failed", error);
  process.exit(1); // Stop app
}
