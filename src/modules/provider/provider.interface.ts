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



export interface IUpdateOrderStatus {
  status: OrderStatus;
}

