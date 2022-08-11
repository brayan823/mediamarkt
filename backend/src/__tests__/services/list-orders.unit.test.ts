import { default as OrderService } from "../../services/OrderService";
import { default as OrderRepository } from "../../repositories/OrderRepository";
import { OrderState } from "../../types";

jest.mock("../../models/Order");
jest.mock("../../repositories/OrderRepository");

describe("Testing list order service", () => {
  it("Should list all Orders", async () => {
    const listRepositoryMock = OrderRepository.list as jest.Mock;

    listRepositoryMock.mockResolvedValue([
      {
        _id: "62384909445ce523267b08fb",
        state: OrderState.OPEN,
        customer: "BRAYAN ANTEQUERO",
        employee: "test",
        items: "PRODUCT 1",
      },
    ]);

    const listdOrderResponse = await OrderService.list();

    expect(listdOrderResponse.length).toBeDefined();
    listdOrderResponse &&
      expect(listdOrderResponse[0].employee).toEqual("test");
  });
});
