import { Router, Response } from "express";
import axios from "axios";
import { inject, injectable } from "tsyringe";
import IDatabaseService from "../domain/interface/iDatabaseService";
import PlanningModel from "../domain/model/planningModel";
const router = Router();

@injectable()
class PlanningService {
  private databaseService: IDatabaseService;
  constructor(
    @inject("DatabaseService")
    databaseService: IDatabaseService
  ) {
    this.databaseService = databaseService;
  }

  public async createPlanning(planning: PlanningModel, res: Response) {
    try {
      let returned = await this.create(planning);

      if (returned) return res.status(204).json("");
      else return res.status(500).json("could not create planning");
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

  public async create(planning: PlanningModel): Promise<boolean> {
    return await this.databaseService.createPlanning(planning);
  }

  public async getPlanningList(res: Response) {
    try {
      let returned = await this.getAllPlanningList();
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

  public async getAllPlanningList(): Promise<PlanningModel[]> {
    return await this.databaseService.getPlanningList();
  }

  public async deletePlanningById(id: string, res: Response) {
    try {
      let returned = await this.delete(id);

      if (returned) return res.status(200).json({});
      else return res.status(500).json("could not delete planning");
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
    const returned = await this.databaseService.deletePlanningById(id);
    console.log(returned);
    return returned;
  }
}

export default PlanningService;
