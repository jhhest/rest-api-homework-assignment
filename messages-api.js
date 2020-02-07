/**
 * Run npm start to start development server.
 *
 * Added cors to prevent "Origin is not allowed by Access-Control-Allow-Origin"
 * problems.
 */

// Add a single endpoint to the app responds to POST requests to the /messages URI.


const cors = require("cors");
const Express = require("express");
const bodyParser = require("body-parser");
const logMiddleware = require("./middleWareFunctions/logMiddleware");

const corsMiddleware = cors();

const app = new Express();
app.use(corsMiddleware, logMiddleware, bodyParser.json());
app.get("/", (request, respond) =>
  respond.send("<h1>Rest Api - Homework Assignment</h1>")
);
app.post("/message", (request, response, next) => {
  console.log("Log of text property of request.body: ", request.body)
  response.send(request.body)
})

const port = 3000;
app.listen(port, () =>
  console.log(`
/**
 * Server listens to port: ${port}
 **/
`)
);
