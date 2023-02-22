import { Router } from "express";
import { container } from "tsyringe";
import UserService from "../../../application/userService";

import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const userRouter = Router();

userRouter.post("/user", async function (req, res) {
  try {
    console.log(`Create user called by Frontend: ${req.body.uid}`, req.body);
    const userService = container.resolve(UserService);

    const user = await userService.createUser(req.body, res);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao gerar User.");
  }
});

export default userRouter;
