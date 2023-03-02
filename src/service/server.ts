import "reflect-metadata";
import "./shared/container";
import express, { Router } from "express";
import cors from "cors";
import indexRouter from "./routes/V1/index";
import {
  createUserRouter,
  getUsersRouter,
  getUserRouter,
} from "./routes/V1/user";
import * as functions from "firebase-functions";
import {
  createPolicyRouter,
  getPoliciesRouter,
  deletePolicyRouter,
} from "./routes/V1/policy";

const app = express();

app.use(cors({ origin: true }));
const router = Router();
router.use(indexRouter);
router.use(createUserRouter);
router.use(getUsersRouter);
router.use(createPolicyRouter);
router.use(getPoliciesRouter);
router.use(deletePolicyRouter);
router.use(getUserRouter);
var appWithV1 = express();
appWithV1.use("/v1", router);
app.use(appWithV1);

exports.operations = functions
  .region("southamerica-east1")
  .https.onRequest(app);
