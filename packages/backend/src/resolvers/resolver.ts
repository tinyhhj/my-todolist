import fs from "fs";
import readline from "readline";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "@tinyhhj/common/src/types/TodoList";

let cache = [] as TodoItem[];
const filedb = "db.txt";
const fd = fs.openSync(filedb, "as+");
const rl = readline.createInterface({
  input: fs.createReadStream("", { fd: fd }),
});
try {
  fs.accessSync(filedb, fs.constants.F_OK | fs.constants.R_OK);

  rl.on("line", (line) => {
    const [key, name, done] = line.split(":");
    cache.push({
      id: key,
      name: name,
      done: done === "true",
    });
  }).on("close", () => {
    console.log(cache);
  });
} catch (err) {
  console.error("no access!");
}

const resolver = {
  Query: {
    getTodoList: () => cache,
  },
  Mutation: {
    addTodo: (_: any, { name }: TodoItem) => {
      // Create a random id for our "database".
      // var id = require('crypto').randomBytes(10).toString('hex');
      if (!name) {
        throw new Error(`name is invalid ${name}`);
      }
      const id = uuidv4();
      const newTodo = {
        id: id,
        name: name,
        done: false,
      };
      cache.push(newTodo);
      fs.appendFileSync(filedb, `${id}:${name}:false\n`);
      return newTodo;
    },
    toggleTodo: (_: any, { id }: TodoItem) => {
      const item = cache.filter((item) => item.id === id);
      if (!item.length) {
        throw new Error(`id is not invalid ${id}`);
      }
      cache = cache.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      );

      fs.writeFileSync(
        filedb,
        cache.map((item) => `${item.id}:${item.name}:${item.done}`).join("\n")
      );
      return { ...item[0], done: !item[0].done };
    },
    removeTodo: (_: any, { id }: TodoItem) => {
      const item = cache.filter((item) => item.id === id);
      if (!item.length) {
        throw new Error(`id is not invalid ${id}`);
      }
      cache = cache.filter((item) => item.id !== id);
      fs.writeFileSync(
        filedb,
        cache.map((item) => `${item.id}:${item.name}:${item.done}`).join("\n")
      );
      return item[0];
    },
  },
};

export default resolver;
