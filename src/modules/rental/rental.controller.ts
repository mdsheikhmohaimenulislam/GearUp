import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
import httpStatus from "http-status";

const createRental = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id as string;

    const result = await rentalService.createRentalIntoDB(customerId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental created successfully",
      data: result,
    });
  },
);

const getMyRentals = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;

  const rentals = await rentalService.getMyRentalsFromDB(customerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental orders fetched successfully",
    data: rentals,
  });
});

const getSingleRental = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;

  const rental = await rentalService.getSingleRentalFromDB(
    customerId,
    req.params.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental details fetched successfully",
    data: rental,
  });
});

export const rentalController = {
  createRental,
  getMyRentals,
  getSingleRental,
};
