import { Router } from "express";
import { auth } from "../../middleWares/auth";
import { rentalController } from "./rental.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/", auth(Role.CUSTOMER), rentalController.createRental);


// router.get("/");
// router.get("/:id"); 

export const rentalRouter = router;

// 686f4f77-3299-4d14-90a0-291b1d4a0618