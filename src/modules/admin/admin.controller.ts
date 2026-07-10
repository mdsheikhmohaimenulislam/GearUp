import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response) => {

    const users =
      await adminService.getAllUsersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users fetched successfully",
      data: {
        users,
      },
    });

  }
);


const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {

    const userId = req.params.id;

    const result =
      await adminService.updateUserStatusIntoDB(
        userId as string,
        req.body
      );


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully",
      data: result,
    });

  }
);

export const adminController = {
    getAllUsers,
    updateUserStatus,
}