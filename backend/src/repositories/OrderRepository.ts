import Order from "../models/Order";
import { IOrder, OrderInput } from "../types/index";

const create = async (order: OrderInput): Promise<IOrder> => {
  return await Order.create(order);
};

const get = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id);
};

const list = async (): Promise<IOrder[]> => {
  return await Order.find();
};

const update = async (id: string, order: any): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(id, { $set: order }, { new: true });
};

export default {
  create,
  get,
  update,
  list,
};
