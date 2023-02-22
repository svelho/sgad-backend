import { container } from "tsyringe";
import IDatabaseService from "../../../domain/interface/iDatabaseService";
import FireStoreService from "../../../infrastructure/Implementation/firestoreService";

container.registerSingleton<IDatabaseService>(
  "DatabaseService",
  FireStoreService
);
