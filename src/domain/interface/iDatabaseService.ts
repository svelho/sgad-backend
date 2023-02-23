import UserModel from "../model/userModel";

interface IDatabaseService {
  createUser(user: UserModel): Promise<boolean>;
  getUsers(): Promise<UserModel[]>;
  // updateStatusDeposit(
  //   referenceId: string,
  //   status: DepositStatus
  // ): Promise<void>;
  // getStatusDepositByReferenceId(referenceId: string): Promise<DepositStatus>;
}

export default IDatabaseService;
