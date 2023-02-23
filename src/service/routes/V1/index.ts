import { Router } from "express";
import { setTimeout } from "timers/promises";
import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const index = Router();

index.get("/", async (req, res) => {
  await setTimeout(2000);
  res.send("Index Page");
});

export default index;
