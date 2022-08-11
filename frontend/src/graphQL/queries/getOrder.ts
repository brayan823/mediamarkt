import gql from "graphql-tag";

export default gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      _id
      state
      customer
      employee
      items
      createdAt
      updatedAt
    }
  }
`;
