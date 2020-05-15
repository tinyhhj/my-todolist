import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import Client from "./components/client";
import { ApolloProvider } from "@apollo/react-hooks";

function App() {
  return (
    <ApolloProvider client={Client}>
      <div className="App">
        <h2>my todo list</h2>
        <TodoList></TodoList>
      </div>
    </ApolloProvider>
  );
}

export default App;
