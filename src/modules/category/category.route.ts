import { Router } from "express";
import { auth } from "../../middleWares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";

const router = Router();



router.get(
  "/",
  categoryController.getAllCategories
);



router.post(
  "/",
  auth(Role.ADMIN),
  categoryController.createCategory
);



router.patch(
  "/:id",
  auth(Role.ADMIN),
  categoryController.updateCategory
);



router.delete(
  "/:id",
  auth(Role.ADMIN),
  categoryController.deleteCategory
);


export const categoryRouter = router;