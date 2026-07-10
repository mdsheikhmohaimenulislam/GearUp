import { Router } from "express";
import { auth } from "../../middleWares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";




const router = Router();



router.get(
  "/users",
  auth(Role.ADMIN),
  adminController.getAllUsers
);
// router.patch("/users/:id", updateUserStatus);
// router.get("/gear", getAllGearAdmin);
// router.get("/rentals", getAllRentals);

export const adminRouter = router
