import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
  admin.firestore().settings({ ignoreUndefinedProperties: true });
}

var Admin = admin;

export default Admin;
