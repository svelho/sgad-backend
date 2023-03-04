import { Router } from "express";
import { container } from "tsyringe";
import PlanningService from "../../../application/planningService";

import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const createPlanningRouter = Router();

createPlanningRouter.post("/planning/create", async function (req, res) {
  try {
    console.log(`Create planning called by Frontend: ${req.body.id}`, req.body);
    const planningService = container.resolve(PlanningService);

    const planning = await planningService.createPlanning(req.body, res);
    return planning;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao gerar Planning.");
  }
});

const getPlanningListRouter = Router();

getPlanningListRouter.get("/planningList", async function (req, res) {
  try {
    console.log(`Get PlanningList called by Frontend:`, req.body);
    const planningService = container.resolve(PlanningService);

    const planning = await planningService.getPlanningList(res);
    return planning;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar Planning.");
  }
});

const deletePlanningRouter = Router();

deletePlanningRouter.delete("/planning/delete/:id", async function (req, res) {
  try {
    const id = req.params.id;
    console.log(`delete planning called by Frontend: ${id}`);
    const planningService = container.resolve(PlanningService);

    const planning = await planningService.deletePlanningById(id, res);
    return planning;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao deletar Planning.");
  }
});

export { createPlanningRouter, getPlanningListRouter, deletePlanningRouter };
