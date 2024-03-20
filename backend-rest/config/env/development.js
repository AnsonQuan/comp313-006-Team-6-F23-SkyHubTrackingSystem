//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
  db: process.env.MONGODB_URI,
  sessionSecret: "developmentSessionSecret",
  secretKey: "real_secret",
};
