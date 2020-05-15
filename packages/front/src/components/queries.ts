import { gql } from "apollo-boost";

export const GET_TODO_LIST = gql`
  {
    getTodoList {
      id
      name
      done
    }
  }
`;
