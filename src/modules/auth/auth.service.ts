import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { ILoginUser, RegisterPayload } from "./auth.interface";

const registerUserIntoDB = async (payload: RegisterPayload) => {
  const { name, email, password, phone, address, role } = payload;

  const ifUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (ifUserExist) {
    throw new Error("User with this email already Exists");
  }

  const hashesPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      address,
      role,
      password: hashesPassword,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },

    omit: { password: true },
  });

  return user;
};

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  if (user.status === "SUSPENDED") {
    throw new Error("Your account has been suspended. Please contact support.");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password.");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMe = async (userId: string) => {
  if (!userId) {
    throw new Error("User id is required.");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.status === "SUSPENDED") {
    throw new Error("Your account has been suspended.");
  }

  return user;
};

export const authService = {
  loginUser,
  registerUserIntoDB,
  getMe,
};
