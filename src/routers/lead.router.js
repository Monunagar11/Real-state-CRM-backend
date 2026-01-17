import { Router } from "express";
import { createLead, deleteLeadById, getAllLeads, getLeadById, getLeadsStatsConversion, updateLeadById, updateLeadStatus } from "../controllers/lead.controllers.js";

const router = Router();

router.route("/").post(createLead);
router.route("/:id").get(getLeadById);
router.route("/:id").put(updateLeadById);
router.route("/:id").delete(deleteLeadById);
router.route("/:id/status").patch(updateLeadStatus);
router.route("/stats/conversion").get(getLeadsStatsConversion);
router.route("/").get(getAllLeads);

export default router;