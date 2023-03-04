import ActivityModel from "../model/activityModel";
import PlanningModel from "../model/planningModel";
import PolicyModel from "../model/policyModel";
import UserModel from "../model/userModel";

interface IDatabaseService {
  createUser(user: UserModel): Promise<boolean>;
  getUsers(): Promise<UserModel[]>;
  getUser(id: string): Promise<UserModel>;
  createPolicy(policy: PolicyModel): Promise<boolean>;
  getPolicies(): Promise<PolicyModel[]>;
  deletePolicyById(id: string): Promise<boolean>;
  createActivity(activity: ActivityModel): Promise<boolean>;
  getActivities(): Promise<ActivityModel[]>;
  deleteActivityById(id: string): Promise<boolean>;
  createPlanning(activity: PlanningModel): Promise<boolean>;
  getPlanningList(): Promise<PlanningModel[]>;
  deletePlanningById(id: string): Promise<boolean>;
}

export default IDatabaseService;
