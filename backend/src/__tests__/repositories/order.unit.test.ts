import Order from "../../models/Order";

import { default as OrderRepository } from "../../repositories/OrderRepository";
import { OrderInput, OrderState } from "../../types";

describe("Testing order repository", () => {
  let idOrder: string;

  const orderInput: OrderInput = {
    state: OrderState.OPEN,
    customer: "BRAYAN ANTEQUERO",
    employee: "test",
    items: "PRODUCT 1",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should create a new Order and get it by id", async () => {
    jest
      .spyOn(Order, "create")
      .mockImplementationOnce(() =>
        Promise.resolve({ ...orderInput, _id: "62f26c5b48ca4b55c630f8d1" })
      );

    const findByIdSpy = jest
      .spyOn(Order, "findById")
      .mockResolvedValue({ ...orderInput, _id: "62f26c5b48ca4b55c630f8d1" });

    const newOrder = await OrderRepository.create(orderInput);
    const getOrder = await OrderRepository.get(newOrder._id);

    idOrder = newOrder._id;

    expect(newOrder._id).toBeDefined();
    getOrder && expect(getOrder.employee).toEqual("test");
    expect(findByIdSpy).toHaveBeenCalledWith(newOrder._id);
  });

  it("Should update a Order", async () => {
    jest.spyOn(Order, "findByIdAndUpdate").mockResolvedValue({
      ...orderInput,
      _id: "62f26c5b48ca4b55c630f8d1",
      customer: "test",
    });

    const updatedOrderResponse = await OrderRepository.update(
      idOrder,
      orderInput
    );

    expect(updatedOrderResponse?._id).toBeDefined();
    updatedOrderResponse && expect(updatedOrderResponse.customer).toBe("test");
  });

  it("Should list all Orders", async () => {
    jest.spyOn(Order, "find").mockResolvedValue([
      {
        ...orderInput,
        _id: "62f26c5b48ca4b55c630f8d1",
      },
    ]);

    const listOrderResponse = await OrderRepository.list();

    expect(listOrderResponse).toBeInstanceOf(Array);
    expect(listOrderResponse).toHaveLength(1);
  });
});
