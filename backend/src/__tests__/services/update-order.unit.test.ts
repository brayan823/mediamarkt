import { default as OrderService } from "../../services/OrderService";
import { default as OrderRepository } from "../../repositories/OrderRepository";
import { OrderState } from "../../types";

jest.mock("../../models/Order");
jest.mock("../../repositories/OrderRepository");

describe("Testing update order service", () => {
  const updatedOrder = {
    _id: "62384909445ce523267b08fb",
    state: OrderState.OPEN,
    customer: "BRAYAN ANTEQUERO",
    employee: "test",
    items: "PRODUCT 1",
  };

  it("Should update a Order", async () => {
    const updateRepositoryMock = OrderRepository.update as jest.Mock;
    const getRepositoryMock = OrderRepository.get as jest.Mock;

    updateRepositoryMock.mockResolvedValue(updatedOrder);
    getRepositoryMock.mockResolvedValue(updatedOrder);

    const updatedOrderResponse = await OrderService.update(
      "62384909445ce523267b08fb",
      { ...updatedOrder, state: OrderState.OPEN }
    );
    expect(updatedOrderResponse?.state).toBe(OrderState.OPEN);
    updatedOrderResponse && expect(updatedOrderResponse.employee).toBe("test");
  });

  it("Should not update a Order and return not found error", async () => {
    const getRepositoryMock = OrderRepository.get as jest.Mock;

    getRepositoryMock.mockResolvedValue(null);

    try {
      await OrderService.update("62384909445ce523267b08fb", {
        ...updatedOrder,
        state: OrderState.OPEN,
      });
    } catch (error: any) {
      expect(error.message).toBe("Order not found");
    }
  });

  it("Should not update a Order and return not found error", async () => {
    const getRepositoryMock = OrderRepository.get as jest.Mock;

    getRepositoryMock.mockResolvedValue(updatedOrder);

    try {
      await OrderService.update("62384909445ce523267b08fb", {
        ...updatedOrder,
        state: OrderState.COMPLETE,
      });
    } catch (error: any) {
      expect(error.message).toBe(
        "The Order only could be updated to same or next step"
      );
    }
  });

  it("Should not update a Order and return employee error", async () => {
    const getRepositoryMock = OrderRepository.get as jest.Mock;

    getRepositoryMock.mockResolvedValue(updatedOrder);

    try {
      await OrderService.update("62384909445ce523267b08fb", {
        ...updatedOrder,
        state: OrderState.IN_PROGRESS,
        employee: undefined,
      });
    } catch (error: any) {
      expect(error.message).toBe(
        "Order with state IN_PROGRESS must include which employee is assigned"
      );
    }
  });
});
