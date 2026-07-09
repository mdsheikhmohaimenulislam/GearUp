import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { gearService } from "./gear.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



const getAllGear = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {

    const gears = await gearService.getAllGearFromDB(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear fetched successfully",
      data: {
        gears,
      },
    });
  }
);



const getSingleGear = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const { id } = req.params;

    const gear = await gearService.getSingleGearFromDB(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear details fetched successfully",
      data: gear,
    });

  }
);



export const gearController = {
  getAllGear,
  getSingleGear,
};