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
const {
  logMiddleware,
  checkNumberOfViews
} = require("./middleWareFunctions/logMiddleware");

const corsMiddleware = cors();

const app = new Express();
app.use(corsMiddleware, logMiddleware, bodyParser.json());

app.get("/", (request, response) =>
  response.send("<h1>Rest Api - Homework Assignment</h1>")
);

let numberOfViews = 0;
app.post("/message", (request, response, next) => {
  console.log("Log of text property of request.body: ", request.body);
  numberOfViews++;
  console.log("This is your ", numberOfViews, " view.");

  if (numberOfViews > 5) {
    response.sendStatus(429).end();
  } else {
    if (!response.headerSent) {
      const textPropsArr = Object.values(request.body);
      let objectMeetRequirements = true;

      for (let i = 0; i < textPropsArr.length; i++) {
        if (textPropsArr[i] === "") {
          objectMeetRequirements = false;
        }
      }

      !objectMeetRequirements && response.sendStatus(500).end();

      objectMeetRequirements && response.send(request.body);
    }
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`
  /**
   * Server listens to port: ${port}
   **/
  `)
);
