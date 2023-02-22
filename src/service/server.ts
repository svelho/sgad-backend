import "reflect-metadata";
import "./shared/container";
import express, { Router } from "express";
import cors from "cors";
import indexRouter from "./routes/V1/index";
import userRouter from "./routes/V1/user";
import * as functions from "firebase-functions";

const app = express();

app.use(cors());
const v1 = Router();
v1.use(indexRouter);
v1.use(userRouter);
app.use(v1);

exports.transactions = functions
  .region("southamerica-east1")
  .https.onRequest(app);
