import { Router } from "express";
import { auth } from "../../middleWares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";

const router = Router();


// Public - Get all categories
router.get(
  "/categories",
  categoryController.getAllCategories
);


// Admin - Create category
router.post(
  "/categories",
  auth(Role.ADMIN),
  categoryController.createCategory
);


// Admin - Update category
router.patch(
  "/:id",
  auth(Role.ADMIN),
  categoryController.updateCategory
);


// Admin - Delete category
router.delete(
  "/:id",
  auth(Role.ADMIN),
  categoryController.deleteCategory
);


export const categoryRouter = router;