import React, { useState } from "react";
import { TodoItem as Todo } from "@tinyhhj/common/src/types/TodoList";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_TODO_LIST,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
} from "../components/queries";
import "./TodoList.css";
type TodoItemProps = {
  item: Todo;
};

const Item = ({ item }: TodoItemProps) => {
  // single update automatically cache update when return id
  //https://www.apollographql.com/docs/react/data/mutations/
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  //
  const [removeTodo] = useMutation(REMOVE_TODO, {
    update(cache, { data: { removeTodo } }) {
      const { getTodoList } = cache.readQuery({ query: GET_TODO_LIST }) || {
        getTodoList: [],
      };
      cache.writeQuery({
        data: {
          getTodoList: getTodoList.filter(
            (todo: Todo) => todo.id !== removeTodo.id
          ),
        },
        query: GET_TODO_LIST,
      });
    },
  });
  return (
    <li className={`todo-item ${item.done ? "done" : ""}`}>
      <span
        className="text"
        onClick={() => toggleTodo({ variables: { id: item.id } })}
      >
        {item.name}
      </span>
      <span
        className="remove"
        onClick={() => removeTodo({ variables: { id: item.id } })}
      >
        (X)
      </span>
    </li>
  );
};

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODO_LIST);
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      const { getTodoList } = cache.readQuery({ query: GET_TODO_LIST }) || {
        getTodoList: [],
      };

      cache.writeQuery({
        query: GET_TODO_LIST,
        data: { getTodoList: getTodoList.concat([addTodo]) },
      });
    },
  });
  const [name, setName] = useState("");
  if (loading) return <p>loading</p>;
  if (error) return <p>error :(</p>;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { name } });
          setName("");
        }}
      >
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
        <button type="submit">등록</button>
      </form>
      <ul>
        {data.getTodoList.map((it: Todo) => (
          <Item item={it} key={it.id}></Item>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
