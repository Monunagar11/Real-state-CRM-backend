import { Router } from "express";
import { createClient, deleteClient, getAllClients, getClientById, getClientHistory, updateClient } from "../controllers/client.controllers.js";

const router = Router();

router.route("/").post(createClient);
router.route("/").get(getAllClients);
router.route("/:id").put(updateClient);
router.route("/:id").get(getClientById);
router.route("/:id").delete(deleteClient);
router.route("/:id/hisotry").get(getClientHistory);

export default router;