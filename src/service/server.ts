import express, { Router } from "express";
import cors from "cors";
import indexRouter from "./routes/V1/index";

const app = express();
app.use(cors());
const v1 = Router();
v1.use(indexRouter);
app.use(v1);
app.listen(3000, () => "server running on port 3005");
