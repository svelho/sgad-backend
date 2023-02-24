import "reflect-metadata";
import "./shared/container";
import express, { Router } from "express";
import cors from "cors";
import indexRouter from "./routes/V1/index";
import { createUserRouter, getUsersRouter } from "./routes/V1/user";
import * as functions from "firebase-functions";
import { createPolicyRouter, getPoliciesRouter } from "./routes/V1/policy";

const app = express();

app.use(cors());
const v1 = Router();
v1.use(indexRouter);
v1.use(createUserRouter);
v1.use(getUsersRouter);
v1.use(createPolicyRouter);
v1.use(getPoliciesRouter);
app.use(v1);

exports.operations = functions
  .region("southamerica-east1")
  .https.onRequest(app);
