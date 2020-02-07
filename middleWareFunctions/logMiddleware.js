const logMiddleware = (request, respond, next) => {
  console.log(
`
/**
 * MiddleWare logging function.
 * New Request is initiated 
 **/}
`
  );
  next();
};

module.exports = logMiddleware;
