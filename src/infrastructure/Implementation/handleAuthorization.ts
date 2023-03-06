import { Request, Response, NextFunction } from "express";
import Admin from "../../service/shared/firestoreStart";
//import * as admin from "firebase-admin";

// admin.initializeApp();
//admin.firestore().settings({ ignoreUndefinedProperties: true });

const handleAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send("Authorization header is missing");
  }

  const authToken = authHeader.split(" ")[1];
  if (!authToken) {
    return res.status(401).send("Authorization header is missing");
  }
  console.log("chegou mais cedo");

  try {
    const decodedToken = await Admin.auth().verifyIdToken(authToken);

    if (!decodedToken) {
      return res.status(401).send("Authorization header is invalid");
    }

    req.user = decodedToken;
    next();
    //return res.status(200).send("Authorization header is valid");
  } catch (error) {
    console.log(error);
    return res.status(401).send("Authorization header is invalid");
  }
};
export default handleAuthorization;
