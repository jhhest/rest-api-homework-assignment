/**
 * npm run start_messages-api 
 * -> To start development server.
 */

const cors = require("cors");
const Express = require("express");
const {
  logMiddleware,
  checkNumberOfViews
} = require("./middleWareFunctions/logMiddleware");

const corsMiddleware = cors();

const app = new Express();
app.use(corsMiddleware, logMiddleware, Express.json());

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
   * 1. REST APIs Homework Assignment
   * 1.1 Create an Express app with a single end-point.
   * Server listens to port: ${port}
   **/
  `)
);
