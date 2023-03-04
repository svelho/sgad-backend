import ActivityModel from "./activityModel";
import policyModel from "./policyModel";
import userModel from "./userModel";

class PlanningModel {
  constructor(
    public id: string,
    public name: string,
    public activity: ActivityModel,
    public objective: string,
    public goal1: string,
    public goal2: string,
    public goal3: string,
    public policies: policyModel[],
    public stakeholders: userModel[],
    public initialDate: Date
  ) {}
}

export default PlanningModel;
