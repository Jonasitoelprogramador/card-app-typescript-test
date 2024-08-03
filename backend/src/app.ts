const { server } = require("./server.ts");

server
  .listen(process.env.PORT || 3001, "0.0.0.0")
  .then(() => console.log("Server running on port " + (process.env.PORT || 3001)))
  .catch((error: Error) => {
    console.log(error.message);
  });
