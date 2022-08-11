import { ApolloServer, ValidationError } from "apollo-server";

import { default as OrderService } from "../../services/OrderService";

import typeDefs from "../../graphql/schemas/schema";
import resolvers from "../../graphql/resolvers/OrderResolver";
import { OrderState } from "../../types";
import { NOT_FOUND } from "../../utils/constants";

jest.mock("../../services/OrderService");

const listQuery = {
  query: `query listOrders {  
    listOrders  {
       _id
       customer
     }
  }`,
  variables: {},
};

const getQuery = {
  query: `query getOrder($id: ID!) {  
     getOrder(id: $id)  {
       _id
       state
     }
  }`,
  variables: { id: "62384909445ce523267b08fb" },
};

const createMutation = {
  query: `mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      _id
      state
      customer
      items
      createdAt
      updatedAt
    }
  }`,
  variables: {
    order: {
      state: OrderState.OPEN,
      customer: "brayan antequero",
      employee: "test",
      items: "product 1",
    },
  },
};

const updateMutation = {
  query: `mutation updateOrder($id: ID!, $order: OrderInput!) {
    updateOrder(id: $id, order: $order) {
      _id
      state
      customer
      items
    }
  }`,
  variables: {
    id: "62384909445ce523267b08fb",
    order: {
      state: OrderState.IN_PROGRESS,
      customer: "brayan antequero",
      employee: "test",
      items: "product 1",
    },
  },
};

describe("Testing graphql resolvers", () => {
  let testServer: ApolloServer;

  beforeAll(async () => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  afterAll(async () => {
    await testServer.stop();
  });

  it("should create an order", async () => {
    const createServiceMock = OrderService.create as jest.Mock;

    createServiceMock.mockResolvedValue({
      _id: "62384909445ce523267b08fb",
      state: OrderState.OPEN,
      customer: "test",
      items: "product 1",
      createdAt: "1660054913561",
      updatedAt: "1660120400281",
    });

    const createOrder = await testServer.executeOperation(createMutation);

    expect(createOrder.errors).toBeUndefined();
    expect(createOrder.data?.createOrder.customer).toBe("test");
  });

  it("should get order by id", async () => {
    const getServiceMock = OrderService.get as jest.Mock;

    getServiceMock.mockResolvedValue({
      _id: "62384909445ce523267b08fb",
      state: OrderState.OPEN,
      customer: "test",
      items: "product 1",
      createdAt: "1660054913561",
      updatedAt: "1660120400281",
    });

    const getOrder = await testServer.executeOperation(getQuery);

    expect(getOrder.errors).toBeUndefined();
    expect(getOrder.data?.getOrder.state).toBe(OrderState.OPEN);
  });

  it("should not get order by id and return error", async () => {
    const getServiceMock = OrderService.get as jest.Mock;

    getServiceMock.mockImplementationOnce(() => {
      throw new ValidationError(NOT_FOUND);
    });

    const getOrder = await testServer.executeOperation(getQuery);
    expect(getOrder.errors).toBeDefined();
  });

  it("should list orders", async () => {
    const listServiceMock = OrderService.list as jest.Mock;

    listServiceMock.mockResolvedValue([
      {
        _id: "62384909445ce523267b08fb",
        state: OrderState.OPEN,
        customer: "test",
        items: "product 1",
        createdAt: "1660054913561",
        updatedAt: "1660120400281",
      },
    ]);

    const list = await testServer.executeOperation(listQuery);

    expect(list.errors).toBeUndefined();
    expect(list.data?.listOrders[0].customer).toBe("test");
  });

  it("should update an order", async () => {
    const updateServiceMock = OrderService.update as jest.Mock;

    updateServiceMock.mockResolvedValue({
      _id: "62384909445ce523267b08fb",
      state: OrderState.OPEN,
      customer: "test",
      items: "product 1",
      createdAt: "1660054913561",
      updatedAt: "1660120400281",
    });

    const updateOrder = await testServer.executeOperation(updateMutation);

    expect(updateOrder.errors).toBeUndefined();
    expect(updateOrder.data?.updateOrder.customer).toBe("test");
  });
});
