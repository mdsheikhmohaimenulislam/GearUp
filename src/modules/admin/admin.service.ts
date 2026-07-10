import { prisma } from "../../lib/prisma";

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


export const adminService = {
getAllUsersFromDB,
}