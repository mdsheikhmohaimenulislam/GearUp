import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import HttpStatus from "http-status";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await authService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "User registered Successfully...!",
      data: { user },
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    console.log(payload, "mim", req);

    const { accessToken, refreshToken } = await authService.loginUser(payload);

 res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully ...!",
      data: { accessToken, refreshToken },
    });
  },
);


const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

const id = req.user?.id


  const result = await authService.getMe(id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully.",
    data: result,
  });
});



export const authController = {
  loginUser,
  registerUser,
  getMe
};
