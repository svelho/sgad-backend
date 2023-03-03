import { Router, Response } from "express";
import axios from "axios";
import { inject, injectable } from "tsyringe";
import IDatabaseService from "../domain/interface/iDatabaseService";
import ActivityModel from "../domain/model/activityModel";
const router = Router();

@injectable()
class ActivityService {
  private databaseService: IDatabaseService;
  constructor(
    @inject("DatabaseService")
    databaseService: IDatabaseService
  ) {
    this.databaseService = databaseService;
  }

  public async createActivity(activity: ActivityModel, res: Response) {
    try {
      let returned = await this.create(activity);

      if (returned) return res.status(204).json("");
      else return res.status(500).json("could not create activity");
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

  public async create(activity: ActivityModel): Promise<boolean> {
    return await this.databaseService.createActivity(activity);
  }

  public async getActivities(res: Response) {
    try {
      let returned = await this.getAllActivities();
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

  public async getAllActivities(): Promise<ActivityModel[]> {
    return this.databaseService.getActivities();
  }

  public async deleteActivityById(id: string, res: Response) {
    try {
      let returned = await this.delete(id);

      if (returned) return res.status(204).json("");
      else return res.status(500).json("could not delete activity");
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

  public async delete(id: string): Promise<boolean> {
    const returned = await this.databaseService.deleteActivityById(id);
    console.log(returned);
    return returned;
  }
}

export default ActivityService;
