const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { mongoose } = require("mongoose");
import createServer from "./server.js";

const api = createServer();

const login_invalid = {
  email: "",
  password: "",
};

describe("/api/user", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // TODO
});
