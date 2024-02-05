import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/index.js";

const createServer = () => {
  const api = express();

  api.use(express.json());
  api.use(cookieParser());

  // cors enabling
  api.use(
    cors({
      origin: "*",
      methods: ["GET,PUT,POST,DELETE,OPTIONS"],
      allowedHeaders: [
        "Access-Control-Allow-Headers",
        "Content-Type",
        "Authorization",
        "Content-Length",
        "X-Requested-With",
      ],
      credentials: true,
    }),
  );

  // get Routes
  api.use("/api", router);

  return api;
};

export default createServer;
