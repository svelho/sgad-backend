import { Router } from "express";
import { container } from "tsyringe";
import ActivityService from "../../../application/activityService";

import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const createActivityRouter = Router();

createActivityRouter.post(
  "/activity/create",
  handleAuthorization,
  async function (req, res) {
    try {
      console.log(
        `Create activity called by Frontend: ${req.body.id}`,
        req.body
      );
      const activityService = container.resolve(ActivityService);

      const activity = await activityService.createActivity(req.body, res);
      return activity;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao gerar Activity.");
    }
  }
);

const getActivitiesRouter = Router();

getActivitiesRouter.get(
  "/activities",
  handleAuthorization,
  async function (req, res) {
    try {
      console.log(`Get Activities called by Frontend:`, req.body);
      const activityService = container.resolve(ActivityService);

      const activity = await activityService.getActivities(res);
      return activity;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao buscar Activity.");
    }
  }
);

const deleteActivityRouter = Router();

deleteActivityRouter.delete(
  "/activity/delete/:id",
  handleAuthorization,
  async function (req, res) {
    try {
      const id = req.params.id;
      console.log(`delete activity called by Frontend: ${id}`);
      const activityService = container.resolve(ActivityService);

      const activity = await activityService.deleteActivityById(id, res);
      return activity;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao deletar Activity.");
    }
  }
);

export { createActivityRouter, getActivitiesRouter, deleteActivityRouter };
