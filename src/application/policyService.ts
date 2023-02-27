import { Router, Response } from "express";
import axios from "axios";
import { inject, injectable } from "tsyringe";
import IDatabaseService from "../domain/interface/iDatabaseService";
import PolicyModel from "../domain/model/policyModel";
const router = Router();

@injectable()
class PolicyService {
  private databaseService: IDatabaseService;
  constructor(
    @inject("DatabaseService")
    databaseService: IDatabaseService
  ) {
    this.databaseService = databaseService;
  }

  public async createPolicy(policy: PolicyModel, res: Response) {
    try {
      let returned = await this.create(policy);

      if (returned) return res.status(200).json(policy);
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

  public async create(policy: PolicyModel): Promise<boolean> {
    return await this.databaseService.createPolicy(policy);
  }

  public async getPolicies(res: Response) {
    try {
      let returned = await this.getAllPolicies();
      if (returned && returned.length > 0)
        return res.status(200).json(returned);
      else return res.status(500).json("could not retrieve policies");
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

  public async getAllPolicies(): Promise<PolicyModel[]> {
    return this.databaseService.getPolicies();
  }

  public async deletePolicyById(id: string, res: Response) {
    try {
      let returned = await this.delete(id);

      if (returned) return res.status(200).json({});
      else return res.status(500).json("could not delete policy");
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
    const returned = await this.databaseService.deletePolicyById(id);
    console.log(returned);
    return returned;
  }
}

export default PolicyService;
