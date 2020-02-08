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

let numberOfViews = 0;

const checkNumberOfViews = (response, request, next) => {
  numberOfViews++;
  console.log("This is your ", numberOfViews, " view.");

  if (numberOfViews > 5) {
    response.sendStatus(429).end();
  }
};
// const checkNumberOfViews = (request, response, next) => {
//   numberOfViews++;
//   console.log("This is your ", numberOfViews, " view.");
//   if (numberOfViews > 5) {
//     response.status(500).json({
//       message: `You sended to many requests to endpoint`,
//       givenInputByClient: request.body
//     });
//   }
// };

module.exports = { logMiddleware, checkNumberOfViews };
