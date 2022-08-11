import { ValidationError, UserInputError } from "apollo-server";

import OrderRepository from "../repositories/OrderRepository";

import { IOrder, OrderInput, OrderState } from "../types";
import {
  NOT_FOUND,
  INVALID_INITIAL_STATE,
  INVALID_UPDATE,
  EMPLOYEE_NOT_FOUND,
} from "../utils/constants";

const create = async (order: OrderInput): Promise<IOrder> => {
  if (order.state !== OrderState.OPEN) {
    throw new UserInputError(INVALID_INITIAL_STATE);
  }

  return await OrderRepository.create({ ...order });
};

const get = async (id: string): Promise<IOrder | null> => {
  const order = await OrderRepository.get(id);

  if (!order) {
    throw new ValidationError(NOT_FOUND);
  }
  return order;
};

const list = async (): Promise<IOrder[]> => {
  return await OrderRepository.list();
};

const update = async (
  id: string,
  orderInput: Partial<OrderInput>
): Promise<IOrder | null> => {
  const order = await OrderRepository.get(id);

  if (!order) {
    throw new ValidationError(NOT_FOUND);
  }

  if (
    (order.state === OrderState.IN_PROGRESS &&
      orderInput.state === OrderState.OPEN) ||
    (order.state === OrderState.OPEN &&
      orderInput.state === OrderState.COMPLETE) ||
    (order.state === OrderState.COMPLETE &&
      orderInput.state !== OrderState.COMPLETE)
  ) {
    throw new UserInputError(INVALID_UPDATE);
  }

  if (orderInput.state === OrderState.IN_PROGRESS && !orderInput.employee) {
    throw new UserInputError(EMPLOYEE_NOT_FOUND);
  }

  return await OrderRepository.update(id, orderInput);
};

export default {
  create,
  get,
  list,
  update,
};
