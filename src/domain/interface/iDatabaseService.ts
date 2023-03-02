import PolicyModel from "../model/policyModel";
import UserModel from "../model/userModel";

interface IDatabaseService {
  createUser(user: UserModel): Promise<boolean>;
  getUsers(): Promise<UserModel[]>;
  getUser(id: string): Promise<UserModel>;
  createPolicy(policy: PolicyModel): Promise<boolean>;
  getPolicies(): Promise<PolicyModel[]>;
  deletePolicyById(id: string): Promise<boolean>;
  // updateStatusDeposit(
  //   referenceId: string,
  //   status: DepositStatus
  // ): Promise<void>;
  // getStatusDepositByReferenceId(referenceId: string): Promise<DepositStatus>;
}

export default IDatabaseService;
