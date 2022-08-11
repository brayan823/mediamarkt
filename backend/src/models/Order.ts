import mongoose from "mongoose";
import { IOrder } from "../types";

const Schema = mongoose.Schema;

const orderSchema: any = new Schema(
  {
    state: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    employee: {
      type: String,
    },
    items: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
