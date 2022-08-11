import { ApolloError } from "apollo-server";

import OrderService from "../../services/OrderService";

const resolvers = {
  Query: {
    getOrder: async (parent: any, args: any) => {
      try {
        const { id } = args;
        return await OrderService.get(id);
      } catch (error: any) {
        return new ApolloError(error.message, error.name) as Error;
      }
    },
    listOrders: async () => {
      try {
        return await OrderService.list();
      } catch (error: any) {
        return new ApolloError(error.message, error.name) as Error;
      }
    },
  },
  Mutation: {
    createOrder: async (parent: any, args: any) => {
      try {
        const { order } = args;
        return await OrderService.create(order);
      } catch (error: any) {
        return new ApolloError(error.message, error.name) as Error;
      }
    },
    updateOrder: async (parent: any, args: any) => {
      try {
        const { id, order } = args;
        return await OrderService.update(id, order);
      } catch (error: any) {
        return new ApolloError(error.message, error.name) as Error;
      }
    },
  },
};

export default resolvers;
