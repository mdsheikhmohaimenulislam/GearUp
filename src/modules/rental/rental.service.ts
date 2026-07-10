import { prisma } from "../../lib/prisma";
import { ICreateRental } from "./rental.interface";

const createRentalIntoDB = async (
  customerId: string,
  payload: ICreateRental,
) => {
  const { gearId, quantity, startDate, endDate } = payload;


  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }


  if (gear.quantityAvailable < quantity) {
    throw new Error("Gear is not available");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);


  if (start >= end) {
    throw new Error("Invalid rental date");
  }


  const rentalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalPrice = Number(gear.pricePerDay) * quantity * rentalDays;


  const order = await prisma.order.create({
    data: {
      customerId,
      gearId,
      quantity,
      startDate: start,
      endDate: end,
      totalPrice,
    },
  });


  await prisma.gearItem.update({
    where: {
      id: gearId,
    },
    data: {
      quantityAvailable: {
        decrement: quantity,
      },
    },
  });

  return order;
};

const getMyRentalsFromDB = async (customerId: string) => {
  const rentals = await prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      gear: {
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
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals;
};

const getSingleRentalFromDB = async (customerId: string, rentalId: string) => {
  const rental = await prisma.order.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      gear: {
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
      },
    },
  });

  if (!rental) {
    throw new Error("Rental order not found");
  }

  if (rental.customerId !== customerId) {
    throw new Error("You are not authorized to view this rental");
  }

  return rental;
};

export const rentalService = {
  createRentalIntoDB,
  getMyRentalsFromDB,
  getSingleRentalFromDB,
};
