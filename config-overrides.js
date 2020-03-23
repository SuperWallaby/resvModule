const path = require("path");
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.resolve("./node_modules/react"),
    "react-day-picker": path.resolve("./node_modules/react-day-picker")
  };
  return config;
};
