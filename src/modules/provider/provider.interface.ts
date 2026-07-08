import { OrderStatus } from "../../../generated/prisma/enums";

export interface ICreateProvider {
  title: string;
  description: string;
  brand?: string;
  pricePerDay: number;
  quantityTotal: number;
  quantityAvailable:number;
  images?: string[]; 
  categoryId: string;
}


// Update Gear
export interface IUpdateGear {
  title?: string;
  description?: string;
  brand?: string;
  pricePerDay?: number;
  quantityTotal?: number;
  quantityAvailable?: number;
  images?: string[];
  categoryId?: string;
}


// Update Order Status
export interface IUpdateOrderStatus {
  status: OrderStatus;
}