import { Router } from "express";
import { gearController } from "./gear.controller";

const router = Router();

// Get all gear with filters
router.get("/gear", gearController.getAllGear);




router.get("/gear/:id", gearController.getSingleGear);



// router.get("/categories");

export const gearRouter = router;
