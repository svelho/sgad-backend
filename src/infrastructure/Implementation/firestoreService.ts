import IDatabaseService from "../../domain/interface/iDatabaseService";
import PolicyModel from "../../domain/model/policyModel";
import UserModel from "../../domain/model/userModel";
import Admin from "../../service/shared/firestoreStart";

class FireStoreService implements IDatabaseService {
  async getPolicies(): Promise<PolicyModel[]> {
    const policiesdb = Admin.firestore().collection("policies");
    let policies: PolicyModel[] = [];
    await policiesdb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => policies.push(doc.data() as PolicyModel));
        return policies;
      })
      .catch((error) => {
        console.log("Erro returning users from firestore: ", error);
      });
    return policies;
  }
  createPolicy(policy: PolicyModel): Promise<boolean> {
    const returned = Admin.firestore()
      .collection("policies")
      .add({
        title: policy.title,
        description: policy.description,
        level: policy.level,
        createAt: new Date(Date.now()),
      })
      .then((writeResult) => {
        console.log("Policy Created result:", writeResult);
        return true;
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added user to firestore: ",
          error
        );
        return false;
      });
    return returned;
  }

  async getUsers(): Promise<UserModel[]> {
    const usersdb = Admin.firestore().collection("users");
    let users: UserModel[] = [];
    await usersdb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => users.push(doc.data() as UserModel));
        return users;
      })
      .catch((error) => {
        console.log("Erro returning users from firestore: ", error);
      });
    return users;
  }

  async createUser(user: UserModel): Promise<boolean> {
    const returned = Admin.firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        name: user.name,
        email: user.email,
        urlPhoto: user.photoUrl,
        createAt: new Date(Date.now()),
      })
      .then((writeResult) => {
        console.log("User Created result:", writeResult);
        return true;
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added user to firestore: ",
          error
        );
        return false;
      });
    return returned;
  }
}

export default FireStoreService;
