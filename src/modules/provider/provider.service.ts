import { prisma } from "../../lib/prisma";
import { ICreateProvider, IUpdateGear, IUpdateOrderStatus } from "./provider.interface";


const createGearIntoDB = async (
  providerId: string,
  payload: ICreateProvider
) => {
  const {
    title,
    description,
    brand,
    pricePerDay,
    quantityTotal,
    images,
    quantityAvailable,
    categoryId,
  } = payload;

  // Check provider
  const provider = await prisma.user.findFirstOrThrow({
    where: {
      id: providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found.");
  }

  // Check category
  const category = await prisma.category.findFirstOrThrow({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found.");
  }

  // Create gear
  const gear = await prisma.gearItem.create({
    data: {
      title,
      description,
      brand,
      pricePerDay,
      quantityTotal,
      quantityAvailable,
      images,
      providerId,
      categoryId,
    },
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
  });

  return gear;
};


const updateGearIntoDB = async (
  providerId: string,
  gearId: string,
  payload: IUpdateGear
) => {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }

  if (gear.providerId !== providerId) {
    throw new Error("You are not authorized to update this gear");
  }

  const result = await prisma.gearItem.update({
    where: {
      id: gearId,
    },
    data: payload,
  });

  return result;
};


const updateOrderStatusIntoDB = async (
  providerId: string,
  orderId: string,
  payload: IUpdateOrderStatus
) => {

  const { status } = payload;



  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      gear: {
        providerId,
      },
    },
  });


  if (!order) {
    throw new Error(
      "Order not found or you are not authorized"
    );
  }


  if (
    order.status === "RETURNED" ||
    order.status === "CANCELLED"
  ) {
    throw new Error(
      "Order status cannot be updated"
    );
  }


  const updatedOrder =
    await prisma.order.update({

      where: {
        id: orderId,
      },

      data: {
        status,
      },

    });


  return updatedOrder;

};



const deleteGearFromDB = async (
  providerId: string,
  gearId: string
) => {
  // 1. Gear exists check
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }


  // 2. Provider ownership check
  if (gear.providerId !== providerId) {
    throw new Error(
      "You are not authorized to delete this gear"
    );
  }


  // 3. Rental/Order check
  const order = await prisma.order.findFirst({
    where: {
      gearId,
    },
  });

  if (order) {
    throw new Error(
      "Cannot delete gear because it has existing orders"
    );
  }


  // 4. Delete gear
  const result = await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

  return result;
};


const getProviderOrdersFromDB = async (providerId: string) => {

  // Check provider
  const provider = await prisma.user.findUnique({
    where: {
      id: providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found.");
  }


  const orders = await prisma.order.findMany({
    where: {
      gear: {
        providerId,
      },
    },

    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      gear: {
        select: {
          id: true,
          title: true,
          brand: true,
          pricePerDay: true,
        },
      },

      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });


  return orders;
};


export const providerService = {
  createGearIntoDB,
  updateGearIntoDB,
updateOrderStatusIntoDB,
  deleteGearFromDB,
  getProviderOrdersFromDB
};
