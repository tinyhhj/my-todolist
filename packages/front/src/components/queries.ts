import { gql } from "apollo-boost";

export const GET_TODO_LIST = gql`
  query {
    getTodoList {
      id
      name
      done
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($name: String!) {
    addTodo(name: $name) {
      id
      name
      done
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      done
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
