import { Router } from "express";
import handleAuthorization from "../../../infrastructure/Implementation/handle_authorization";

const index = Router();

index.get("/", handleAuthorization, (req, res) => {
  res.send("Index Page");
});

export default index;
