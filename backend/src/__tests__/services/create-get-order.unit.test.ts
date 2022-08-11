import { default as OrderService } from "../../services/OrderService";

import { default as OrderRepository } from "../../repositories/OrderRepository";
import { OrderInput, OrderState } from "../../types";

jest.mock("../../models/Order");
jest.mock("../../repositories/OrderRepository");

describe("Testing create and get order services", () => {
  const orderInput: OrderInput = {
    state: OrderState.OPEN,
    customer: "BRAYAN ANTEQUERO",
    employee: "test",
    items: "PRODUCT 1",
  };

  it("Should create a new Order and get it by id", async () => {
    const repositoryCreateMock = OrderRepository.create as jest.Mock;
    const repositoryGetMock = OrderRepository.get as jest.Mock;

    repositoryCreateMock.mockReturnValue({
      ...orderInput,
      _id: "62f26c5b48ca4b55c630f8d1",
    });
    repositoryGetMock.mockResolvedValue({
      ...orderInput,
      _id: "62f26c5b48ca4b55c630f8d1",
    });

    const newOrderResponse = await OrderService.create(orderInput);
    const getOrderResponse = await OrderService.get(newOrderResponse._id);

    expect(newOrderResponse._id).toBeDefined();
    getOrderResponse && expect(getOrderResponse.employee).toBe("test");
  });

  it("Should not create a Order and return error state error", async () => {
    try {
      await OrderService.create({ ...orderInput, state: OrderState.COMPLETE });
    } catch (error: any) {
      expect(error.message).toBe("Order must be created with state OPEN");
    }
  });

  it("Should not get a Order and return not found error", async () => {
    const repositoryGetMock = OrderRepository.get as jest.Mock;

    repositoryGetMock.mockResolvedValue(null);

    try {
      await OrderService.get("62f26c5b48ca4b55c630f8d2");
    } catch (error: any) {
      expect(error.message).toBe("Order not found");
    }
  });
});
