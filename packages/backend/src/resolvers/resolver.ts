const resolver = {
  Query: {
    getTodoList: () => [
      {
        id: "1",
        name: "aa",
        done: false,
      },
      {
        id: "2",
        name: "bb",
        done: false,
      },
      {
        id: "3",
        name: "cc",
        done: true,
      },
    ],
  },
};

export default resolver;
