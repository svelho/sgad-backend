import { Router } from "express";

const index = Router();

index.get("/", (req, res) => {
  res.send("Index Page");
});

export default index;
