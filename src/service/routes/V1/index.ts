import { Router } from "express";
import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const index = Router();

index.get("/", (req, res) => {
  res.send("Index Page");
});

export default index;
