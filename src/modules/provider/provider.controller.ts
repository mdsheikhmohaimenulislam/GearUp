import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { providerService } from "./provider.service";

// Add Gear
const createGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user?.id as string;

  console.log(providerId, req.body);

  const gear = await providerService.createGearIntoDB(providerId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Gear created successfully",
    data: {
      gear,
    },
  });
});

// Update Gear
const updateGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user?.id as string;

  const gear = await providerService.updateGearIntoDB(
    providerId,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Gear updated successfully",
    data: {
      gear,
    },
  });
});

// Delete Gear
const deleteGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user?.id as string;

  await providerService.deleteGearFromDB(providerId, req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Gear deleted successfully",
    data: null,
  });
});

// Get Provider Orders
const getProviderOrders = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user?.id as string;

  const orders = await providerService.getProviderOrdersFromDB(providerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Provider orders fetched successfully",
    data: {
      orders,
    },
  });
});

// Update Order Status
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user?.id as string;

  const order = await providerService.updateOrderStatusIntoDB(
    providerId,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated successfully",
    data: {
      order,
    },
  });
});

export const providerController = {
  createGear,
  updateGear,
  deleteGear,
  getProviderOrders,
  updateOrderStatus,
};
