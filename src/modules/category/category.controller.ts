import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { categoryService } from "./category.service";
import httpStatus from "http-status";

const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryService.getAllCategoriesFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories fetched successfully",
      data: {
        categories,
      },
    });
  },
);

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryService.createCategoryIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: {
        category,
      },
    });
  },
);

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await categoryService.updateCategoryIntoDB(
      id as string,
      payload,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  },
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const categoryController = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
