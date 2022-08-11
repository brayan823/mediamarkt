import { Document, Types } from "mongoose";

export enum OrderState {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
}

export interface OrderInput {
  id?: Types.ObjectId;
  state: OrderState;
  customer: string;
  employee?: string;
  items: string;
}

export interface IOrder extends Document {
  id?: Types.ObjectId;
  state: OrderState;
  customer: string;
  employee?: string;
  items: string;
  createdAt?: Date;
  updatedAt?: Date;
}
