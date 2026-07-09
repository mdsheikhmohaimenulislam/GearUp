import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
import httpStatus from 'http-status';

const createRental = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {

    const customerId = req.user?.id as string;

    const result =
      await rentalService.createRentalIntoDB(
        customerId,
        req.body
      );


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental created successfully",
      data: result,
    });

  }
);


export const rentalController  = {
    createRental
}