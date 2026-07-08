import express, { Router } from 'express';
import { authController } from './auth.controller';
import { Role } from '../../../generated/prisma/enums';
import { auth } from '../../middleWares/auth';


const router = Router();

router.post("/register", authController.registerUser);
router.post("/login",auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), authController.loginUser);
router.get("/me",  auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), authController.getMe);

export const authRouter = router;
