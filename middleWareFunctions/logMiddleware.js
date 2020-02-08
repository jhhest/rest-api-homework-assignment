const bodyParser = (require = "body-parser");
const logMiddleware = (response, request, next) => {
  console.log(
    `
/**
 * MiddleWare logging function.
 * New Request is initiated 
 **/
`
  );
  next();
};
let numberOfViews = 0
const checkNumberOfViews = (request, response, next) => {
  console.log("Log of text property of request.body: ", request.body);
  numberOfViews++;
  console.log("This is your ", numberOfViews, " view.");

  if (numberOfViews > 5) {
    response.sendStatus(429).end();
  } else {
    next();
  }
};

module.exports = { logMiddleware, checkNumberOfViews };
