//const request = require("supertest");
import supertest from "supertest";
const { MongoMemoryServer } = require("mongodb-memory-server");
const { mongoose } = require("mongoose");
import createServer from "./server.js";

const api = createServer();

let userId = "";
let videoId = "";
let token = "";

const login_invalid = {
  email: "",
  password: "",
};

const login_valid = {
  email: "alejandro@test.com",
  password: "12345678",
};

const register_valid = {
  email: "alejandro@test.com",
  username: "alejocamacho",
  password: "12345678",
  name: "Alejandro",
  last_name: "Camacho",
  country: "Venezuela",
};

const register_invalid = {
  email: "",
  username: "alejocamacho",
  password: "12345678",
  name: "Alejandro",
  last_name: "Camacho",
};

const video_data_invalid = {
  owner: "",
  video_name: "¿Por qué la ansiedad es cada vez más común?",
  privacy: "publica",
  file_url: "url_invalida",
};

describe("Videos App", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("/api/auth", () => {
    it("Should fail if the register data is empty o incorrect.", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/auth/register")
        .send(register_invalid)
        .set("Accept", "application/json")
        .expect(403);

      expect(body).toEqual(
        expect.objectContaining({
          errors: expect.any(Array),
        }),
      );
    });

    it("Should pass if the register data is correct.", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/auth/register")
        .send(register_valid)
        .set("Accept", "application/json")
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          user: expect.any(Object),
          token: expect.any(String),
        }),
      );
    });

    it("Should fail if the login data is empty o incorrect", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/auth/login")
        .send(login_invalid)
        .set("Accept", "application/json")
        .expect(403);

      expect(body).toEqual(
        expect.objectContaining({
          errors: expect.any(Array),
        }),
      );
    });

    it("Should pass if the login data is correct.", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/auth/login")
        .send(login_valid)
        .set("Accept", "application/json")
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          user: expect.any(Object),
          token: expect.any(String),
        }),
      );

      userId = body.user._id;
      token = body.token;
    });
  });

  // VIDEOS

  describe("/api/videos", () => {
    it("Should fail if I try to create a video without being authenticated", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/video")
        .send(video_data_invalid)
        .set("Accept", "application/json")
        .expect(401);
    });

    it("Should fail if the create video data is empty o incorrect.", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/video")
        .send(video_data_invalid)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(body).toEqual(
        expect.objectContaining({
          errors: expect.any(Array),
        }),
      );
    });

    it("Should pass if the create video data is correct", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/video")
        .send({
          owner: userId,
          video_name:
            "Power Focus - 14Hz Beta Waves that Improve Concentration",
          privacy: "private",
          file_url: "https://www.youtube.com/watch?v=YWIhyOWxKPw",
          description: "Video con musica para concentrarse",
        })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          videoData: expect.any(Object),
        }),
      );

      videoId = body.videoData._id;
    });

    it("Should fail if I try to access a private video without authorization", async () => {
      const { body, statusCode } = await supertest(api)
        .get(`/api/video/${videoId}`)
        .send(video_data_invalid)
        .set("Accept", "application/json")
        .expect(401);

      expect(body).toEqual({
        msg: "Only registered users can view this video",
      });
    });

    it("Should pass if I comment on a video without being authenticated", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/video/addComment")
        .send({
          videoId: videoId,
          text: "Escuchar este tipo de música es muy relajante",
        })
        .set("Accept", "application/json")
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          videoData: expect.any(Object),
        }),
      );
    });

     it("Should pass if I liked on a video without being authenticated", async () => {
      const { body, statusCode } = await supertest(api)
        .post("/api/video/addLike")
        .send({
          videoId: videoId,
          userId: userId,
        })
        .set("Accept", "application/json")
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          videoData: expect.any(Object),
        }),
      );
    });
  });
});
