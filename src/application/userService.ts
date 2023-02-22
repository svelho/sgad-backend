import { Router, Response } from "express";
import axios from "axios";
import { inject, injectable } from "tsyringe";

import UserModel from "../domain/model/userModel";
import IDatabaseService from "../domain/interface/iDatabaseService";
const router = Router();

@injectable()
class UserService {
  private databaseService: IDatabaseService;
  constructor(
    @inject("DatabaseService")
    databaseService: IDatabaseService
  ) {
    this.databaseService = databaseService;
  }

  public async createUser(user: UserModel, res: Response) {
    try {
      let returned = await this.create(user);
      console.log("booleano", returned);
      if (returned) return res.status(200).json(user);
      else return res.status(500).json("could not create user");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err);
        return res.status(err.status ?? 500).json(err.message);
      } else {
        console.log(err);
        return res.status(500).json("Internal Server Error");
      }
    }
  }

  public async create(user: UserModel): Promise<boolean> {
    return this.databaseService.createUser(user);
  }
}

export default UserService;