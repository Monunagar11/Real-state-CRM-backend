import { Router } from "express";
import { addNewProperty, deletePropertyById, getAllProperties, getPropertyById, updatePropertyStatus } from "../controllers/property.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// router.route("").get(getAllProperties);
router.route("/").post(upload.fields([
    {
        name:"propertyImages",
        maxCount:5
    }
]), addNewProperty);
router.route("/:id").get(getPropertyById);
router.route("/").get(getAllProperties);
router.route("/:id").delete(deletePropertyById);
router.route("/:id/status").patch(updatePropertyStatus);

export default router;

