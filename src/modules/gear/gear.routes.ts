import { Router } from "express";
import { gearController } from "./gear.controller";

const router = Router();

// Get all gear with filters
router.get("/gear", gearController.getAllGear);

console.log(gearController);


// router.get("/gear/:id");
// router.get("/categories");

export const gearRouter = router;
