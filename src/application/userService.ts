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

      if (returned) return res.status(204).json("");
      else return res.status(500).json("could not create policy");
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
    return await this.databaseService.createUser(user);
  }

  public async getUsers(res: Response) {
    try {
      let returned = await this.getAllUsers();
      if (returned && returned.length > 0)
        return res.status(200).json(returned);
      else return res.status(200).json([]);
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

  public async getAllUsers(): Promise<UserModel[]> {
    return await this.databaseService.getUsers();
  }

  public async getUser(id: string, res: Response) {
    try {
      let returned = await this.getUserById(id);
      if (returned && returned.name != undefined)
        return res.status(200).json(returned);
      else return res.status(200).json({});
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

  public async getUserById(id: string): Promise<UserModel> {
    return await this.databaseService.getUser(id);
  }
}

export default UserService;
