import { Router } from "express";
import { container } from "tsyringe";
import UserService from "../../../application/userService";

import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const createUserRouter = Router();

createUserRouter.post("/user/create", async function (req, res) {
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

const getUsersRouter = Router();

getUsersRouter.get("/users", handleAuthorization, async function (req, res) {
  try {
    console.log(`Get Users called by Frontend:`, req.body);
    const userService = container.resolve(UserService);

    const user = await userService.getUsers(res);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar Users.");
  }
});

export { createUserRouter, getUsersRouter };
