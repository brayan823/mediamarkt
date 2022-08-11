import { gql } from "apollo-server";

const typeDefs = gql`
  type Order {
    _id: ID
    state: OrderState!
    customer: String!
    employee: String
    items: String!
    createdAt: String!
    updatedAt: String!
  }

  input OrderInput {
    state: OrderState!
    customer: String!
    employee: String
    items: String!
  }

  enum OrderState {
    OPEN
    IN_PROGRESS
    COMPLETE
  }

  type Query {
    getOrder(id: ID!): Order
    listOrders: [Order]!
  }

  type Mutation {
    createOrder(order: OrderInput!): Order!
    updateOrder(id: ID!, order: OrderInput): Order!
  }
`;

export default typeDefs;
