import { prisma } from "../../lib/prisma";
import { IUpdateUserStatus } from "./admin.interface";

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const updateUserStatusIntoDB = async (
  userId: string,
  payload: IUpdateUserStatus,
) => {
  const { status } = payload;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      status,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return updatedUser;
};

const getAllGearFromDB = async () => {
  const gears = await prisma.gearItem.findMany({
    include: {
      category: true,

      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return gears;
};

const getAllRentalsFromDB = async () => {
  const rentals = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      gear: {
        select: {
          id: true,
          title: true,
          brand: true,
        },
      },

      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals;
};

export const adminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllGearFromDB,
  getAllRentalsFromDB,
};
