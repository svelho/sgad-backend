import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

const handleAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).send("Authorization header is missing");
    return;
  }

  const authToken = authHeader.split(" ")[1];
  if (!authToken) {
    res.status(401).send("Authorization header is missing");
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(authToken);
  console.log(decodedToken);
  if (!decodedToken) {
    res.status(401).send("Authorization header is invalid");
    return;
  }

  req.user = decodedToken;
  next();
};
export default handleAuthorization;
