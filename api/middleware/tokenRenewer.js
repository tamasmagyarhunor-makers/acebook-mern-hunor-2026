const { generateToken, decodeToken } = require("../lib/token");

function tokenRenewer(req, res, next) {
  // we save the original json object
  const originalJson = res.json;

  // we overwrite the res.json
  res.json = function (data) {
    // add a token only if the user is authenticated and data is an object
    if (req.user_id && data && typeof data === 'object' && !data.token) {
      const newToken = generateToken(req.user_id);
      data.token = newToken;
    }
    
    // we now call the original res.json with the modified data
    return originalJson.call(this, data);
  };

  next();
}

module.exports = tokenRenewer;