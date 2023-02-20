import express, { Router } from "express";
import cors from "cors";
import indexRouter from "./routes/V1/index";
import * as functions from "firebase-functions";

const app = express();

app.use(cors());
const v1 = Router();
v1.use(indexRouter);
app.use(v1);

exports.transactions = functions
  .region("southamerica-east1")
  .https.onRequest(app);
