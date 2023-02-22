import IDatabaseService from "../../domain/interface/iDatabaseService";
import UserModel from "../../domain/model/userModel";
import * as admin from "firebase-admin";

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

class FireStoreService implements IDatabaseService {
  async createUser(user: UserModel): Promise<boolean> {
    const returned = admin
      .firestore()
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
