import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReviewIntoDB = async (
  customerId: string,
  payload: ICreateReview,
) => {
  const { gearItemId, orderId, rating, comment } = payload;

  // Rating validation
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // Check order belongs to customer and returned
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
      status: "RETURNED",
    },
  });

  if (!order) {
    throw new Error("You can review only after returning the gear");
  }

  // Check gear exists in that order
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearItemId,
    },
  });

  if (!gear) {
    throw new Error("Gear not found");
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      customerId,

      gearItemId,

      orderId,

      rating,

      comment,
    },
  });

  return review;
};

export const reviewService = { createReviewIntoDB };
