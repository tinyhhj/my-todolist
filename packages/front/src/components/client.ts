import ApolloClient from "apollo-boost";

let host = "http://localhost:4001/graphql";
if (process.env.REACT_APP_NODE_ENV === "production") {
  host = process.env.REACT_APP_BACKEND_URL || host;
}
const client = new ApolloClient({
  uri: host,
});

export default client;
