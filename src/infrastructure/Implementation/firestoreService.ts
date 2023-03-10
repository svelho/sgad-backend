import { user } from "firebase-functions/v1/auth";
import IDatabaseService from "../../domain/interface/iDatabaseService";
import ActivityModel from "../../domain/model/activityModel";
import PlanningModel from "../../domain/model/planningModel";
import PolicyModel from "../../domain/model/policyModel";
import UserModel from "../../domain/model/userModel";
import Admin from "../../service/shared/firestoreStart";

class FireStoreService implements IDatabaseService {
  async createPlanning(planning: PlanningModel): Promise<boolean> {
    const returned = Admin.firestore()
      .collection("planning")
      .add({
        name: planning.name,
        activity: planning.activity,
        objective: planning.objective,
        goal1: planning.goal1,
        goal2: planning.goal2,
        goal3: planning.goal3,
        policies: planning.policies,
        stakeholders: planning.stakeholders,
        initialDate: planning.initialDate,
        createAt: new Date(Date.now()),
      })
      .then((writeResult) => {
        console.log("Planning Created result:", writeResult);
        return true;
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added planning to firestore: ",
          error
        );
        return false;
      });
    return returned;
  }
  async getPlanningList(): Promise<PlanningModel[]> {
    const planningdb = Admin.firestore().collection("planning");
    let planningList: PlanningModel[] = [];
    await planningdb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let x = doc.data() as PlanningModel;
          x.id = doc.id;
          planningList.push(x);
        });
        return planningList;
      })
      .catch((error) => {
        console.log("Erro returning planning list from firestore: ", error);
      });
    return planningList;
  }
  async deletePlanningById(id: string): Promise<boolean> {
    const planningdb = Admin.firestore().collection("planning");
    let returned: boolean;
    try {
      await planningdb.doc(id).delete();
      returned = true;
    } catch (error) {
      returned = false;
    }

    return returned;
  }
  async createActivity(activity: ActivityModel): Promise<boolean> {
    const returned = await Admin.firestore()
      .collection("activities")
      .add({
        title: activity.title,
        description: activity.description,
        level: activity.level,
        createAt: new Date(Date.now()),
      })
      .then((writeResult) => {
        console.log("Activity Created result:", writeResult);
        return true;
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added activity to firestore: ",
          error
        );
        return false;
      });
    return returned;
  }
  async getActivities(): Promise<ActivityModel[]> {
    const activitiesdb = Admin.firestore().collection("activities");
    let activities: ActivityModel[] = [];
    await activitiesdb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let x = doc.data() as ActivityModel;
          x.id = doc.id;
          activities.push(x);
        });
        return activities;
      })
      .catch((error) => {
        console.log("Erro returning activities from firestore: ", error);
      });
    return activities;
  }
  async deleteActivityById(id: string): Promise<boolean> {
    const activitiesdb = Admin.firestore().collection("activities");
    let returned: boolean;
    try {
      await activitiesdb.doc(id).delete();
      returned = true;
    } catch (error) {
      returned = false;
    }

    return returned;
  }
  async getUser(id: string): Promise<UserModel> {
    const usersdb = Admin.firestore().collection("users");
    const doc = await usersdb.doc(id).get();
    const returned = doc.data() as UserModel;
    console.log("retornou", returned);
    return returned;
  }

  async deletePolicyById(id: string): Promise<boolean> {
    const policiesdb = Admin.firestore().collection("policies");
    let returned: boolean;
    try {
      await policiesdb.doc(id).delete();
      returned = true;
    } catch (error) {
      returned = false;
    }

    return returned;
  }
  async getPolicies(): Promise<PolicyModel[]> {
    const policiesdb = Admin.firestore().collection("policies");
    let policies: PolicyModel[] = [];
    await policiesdb
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let x = doc.data() as PolicyModel;
          x.id = doc.id;
          policies.push(x);
        });
        return policies;
      })
      .catch((error) => {
        console.log("Erro returning users from firestore: ", error);
      });
    return policies;
  }
  async createPolicy(policy: PolicyModel): Promise<boolean> {
    const returned = await Admin.firestore()
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
    console.log("user:", user);
    const returned = await Admin.firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        name: user.name,
        email: user.email,
        urlPhoto: user.photoUrl,
        phone: user.phone,
        position: user.position,
        area: user.area,
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
