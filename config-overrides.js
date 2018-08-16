const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = {
  webpack: function(config, env) {
    //do stuff with the webpack config...
    config = rewireReactHotLoader(config, env);
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      if(config.proxy[0]) {
        config.proxy[0].target = process.env.REACT_APP_API_URL;
      } else {
        throw Error("You must specify proxy option in package.json for app to work on localhost");
      }
      return config;
    };
  }
};
