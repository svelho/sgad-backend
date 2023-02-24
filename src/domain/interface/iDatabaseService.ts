import PolicyModel from "../model/policyModel";
import UserModel from "../model/userModel";

interface IDatabaseService {
  createUser(user: UserModel): Promise<boolean>;
  getUsers(): Promise<UserModel[]>;
  createPolicy(policy: PolicyModel): Promise<boolean>;
  getPolicies(): Promise<PolicyModel[]>;
  // updateStatusDeposit(
  //   referenceId: string,
  //   status: DepositStatus
  // ): Promise<void>;
  // getStatusDepositByReferenceId(referenceId: string): Promise<DepositStatus>;
}

export default IDatabaseService;
