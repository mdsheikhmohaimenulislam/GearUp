import crypto from "crypto";
import { prisma } from "../../lib/prisma";

import { IConfirmPayment, ICreatePayment } from "./payment.interface";
import config from "../../config";
import { stripe } from "../../lib/stripe";

const createCheckoutSession = async (
  customerId: string,
  payload: ICreatePayment,
) => {
  const { orderId } = payload;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      gear: true,
      customer: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.customerId !== customerId) {
    throw new Error("You are not authorized");
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: order.customer.email,

    payment_method_types: ["card"],

    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "bdt",

          product_data: {
            name: order.gear.title,
          },

          unit_amount: Math.round(Number(order.totalPrice) * 100),
        },

        quantity: 1,
      },
    ],

    success_url: `${config.app_url}/payment/success`,
    cancel_url: `${config.app_url}/payment/cancel`,

    metadata: {
      orderId,
      customerId,
    },
  });

  const payment = await prisma.payment.create({
    data: {
      transactionId: session.id,

      rentalOrderId: orderId,

      amount: order.totalPrice,

      method: "STRIPE",

      status: "PENDING",

      rawResponse: {
        id: session.id,
        url: session.url,
        payment_status: session.payment_status,
        status: session.status,
      },
    },
  });

  return {
    payment,
  };
};

const confirmPaymentIntoDB = async (
  customerId: string,
  payload: IConfirmPayment,
) => {
  const { sessionId } = payload;

  // 1. Verify Stripe session
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new Error("Payment session not found");
  }

  // 2. Check payment completed
  if (session.payment_status !== "paid") {
    throw new Error("Payment is not completed");
  }

  // 3. Get order id from metadata
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new Error("Order id not found in payment session");
  }

  // 4. Check order belongs to customer
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
  });

  if (!order) {
    throw new Error("Order not found or you are not authorized");
  }

  // 5. Find payment record
  const payment = await prisma.payment.findFirst({
    where: {
      rentalOrderId: orderId,
    },
  });

  if (!payment) {
    throw new Error("Payment record not found");
  }

  // 6. Prevent duplicate confirmation
  if (payment.status === "PAID") {
    return payment;
  }

  // 7. Verify amount
  const paidAmount = Number(session.amount_total) / 100;

  if (Number(payment.amount) !== paidAmount) {
    throw new Error("Payment amount mismatch");
  }

  // 8. Update payment
  const updatedPayment = await prisma.payment.update({
    where: {
      id: payment.id,
    },

    data: {
      transactionId: session.payment_intent as string,

      status: "PAID",

      paidAt: new Date(),

      rawResponse: {
        sessionId: session.id,
        paymentIntent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email,
      },
    },
  });

  // 9. Update order status
  await prisma.order.update({
    where: {
      id: orderId,
    },

    data: {
      status: "CONFIRMED",
    },
  });

  return updatedPayment;
};


const getMyPaymentsFromDB = async (
  customerId: string
) => {

  const payments = await prisma.payment.findMany({

    where: {

      rentalOrder: {
        customerId,
      },

    },

    include: {

      rentalOrder: {
        select: {
          id: true,
          quantity: true,
          startDate: true,
          endDate: true,
          status: true,

          gear: {
            select: {
              id: true,
              title: true,
              brand: true,
            },
          },

        },
      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

  return payments;

};

export const paymentService = {
  createCheckoutSession,
  confirmPaymentIntoDB,
  getMyPaymentsFromDB,
};
