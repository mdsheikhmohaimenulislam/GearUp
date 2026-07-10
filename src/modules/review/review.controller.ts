import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { reviewService } from "./review.service";

const createReview = catchAsync(
  async (req: Request, res: Response) => {

    const customerId = req.user?.id as string;


    const result =
      await reviewService.createReviewIntoDB(
        customerId,
        req.body
      );


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully",
      data: result,
    });

  }
);


export const reviewController = {createReview}