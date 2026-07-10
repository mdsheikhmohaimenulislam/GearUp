export interface ICreateReview {
  gearItemId: string;
  orderId: string;
  rating: number;
  comment?: string;
}