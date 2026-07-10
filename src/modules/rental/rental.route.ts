import { Router } from "express";
import { auth } from "../../middleWares/auth";
import { rentalController } from "./rental.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.CUSTOMER), rentalController.createRental);

router.get("/", auth(Role.CUSTOMER), rentalController.getMyRentals);

router.get("/:id", auth(Role.CUSTOMER), rentalController.getSingleRental);

export const rentalRouter = router;


