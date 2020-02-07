/**
 * Run npm start to start development server.
 *
 * Added cors to prevent "Origin is not allowed by Access-Control-Allow-Origin"
 * problems.
 */

// Create an Express app in that file.
// The app should listen for requests on port 3000.
// TODO:
// Make sure you add the required dependency.
const cors = require("cors");
const Express = require("express");
const bodyParser = require("body-parser");
const logMiddleware = require("./middleWareFunctions/logMiddleware")

const corsMiddleware = cors();

const app = new Express();
app.use(corsMiddleware, logMiddleware, bodyParser.json());
app.get("/", (request, respond) =>
  respond.send("<h1>Rest Api - Homework Assignment</h1>")
);

const port = 3000;
app.listen(port, () =>
  console.log(`
/**
 * Server listens to port: ${port}
 **/
`)
);
