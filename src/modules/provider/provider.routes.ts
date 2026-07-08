import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { providerController } from "./provider.controller";
import { auth } from "../../middleWares/auth";


const router = Router();


// Add gear to inventory
router.post(
  "/gear",
  auth(Role.PROVIDER),
  providerController.createGear
);


// Update gear listing
router.put(
  "/gear/:id",
  auth(Role.PROVIDER),
  providerController.updateGear
);


// Remove gear listing
router.delete(
  "/gear/:id",
  auth(Role.PROVIDER),
  providerController.deleteGear
);


// Get incoming rental orders
router.get(
  "/orders",
  auth(Role.PROVIDER),
  providerController.getProviderOrders
);


// Update rental order status
router.patch(
  "/orders/:id",
  auth(Role.PROVIDER),
  providerController.updateOrderStatus
);


export const providerRoutes = router;