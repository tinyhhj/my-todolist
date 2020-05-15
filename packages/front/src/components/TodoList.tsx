import React, { useState } from "react";
import { TodoItem as Todo } from "@tinyhhj/common/src/types/TodoList";
import { useQuery } from "@apollo/react-hooks";
import { GET_TODO_LIST } from "../components/queries";
type TodoItemProps = {
  item: Todo;
};

const Item = ({ item }: TodoItemProps) => {
  const [done, setDone] = useState(item.done);
  return (
    <li>
      <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
      {item.name}
    </li>
  );
};

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODO_LIST);
  if (loading) return <p>loading</p>;
  if (error) return <p>error :(</p>;
  return (
    <ul>
      {data.getTodoList.map((it: Todo) => (
        <Item item={it} key={it.id}></Item>
      ))}
    </ul>
  );
};

export default TodoList;
