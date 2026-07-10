import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { prisma } from "../../lib/prisma";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;

  console.log(req.body); // এটা add করো
  const result = await paymentService.createCheckoutSession(
    customerId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment session created successfully",
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;

  const result = await paymentService.confirmPaymentIntoDB(
    customerId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment confirmed successfully",
    data: result,
  });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;

  const result = await paymentService.getMyPaymentsFromDB(customerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrieved successfully",
    data: result,
  });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;
  const paymentId = req.params.id;

  const result = await paymentService.getPaymentDetailsFromDB(
    customerId,
    paymentId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentDetails,
};
