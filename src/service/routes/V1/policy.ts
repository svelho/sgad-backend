import { Router } from "express";
import { container } from "tsyringe";
import PolicyService from "../../../application/policyService";

import handleAuthorization from "../../../infrastructure/Implementation/handleAuthorization";

const createPolicyRouter = Router();

createPolicyRouter.post("/policy/create", async function (req, res) {
  try {
    console.log(`Create policy called by Frontend: ${req.body.id}`, req.body);
    const policyService = container.resolve(PolicyService);

    const policy = await policyService.createPolicy(req.body, res);
    return policy;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao gerar Policy.");
  }
});

const getPoliciesRouter = Router();

getPoliciesRouter.get("/policies", async function (req, res) {
  try {
    console.log(`Get Policies called by Frontend:`, req.body);
    const policyService = container.resolve(PolicyService);

    const policy = await policyService.getPolicies(res);
    return policy;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar Policy.");
  }
});

export { createPolicyRouter, getPoliciesRouter };
