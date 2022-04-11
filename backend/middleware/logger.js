const separator = () => console.log(new Array(50).join('##'));
const logger = (req, res, next) => {
  separator();
  console.log('New Request:');
  console.log(`req.method: ${req.method}`);
  console.log(`req.headers: ${JSON.stringify(req.headers)}`);
  console.log(`req.body: ${JSON.stringify(req.body)}`);
  next();
};

module.exports = logger;
