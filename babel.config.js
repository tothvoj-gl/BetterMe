module.exports = function (api) {
  api.cache(true);
  const plugins = [["react-native-unistyles/plugin"]];
  // unistyles plugin breaks jest tests
  const pluginsDuringTests = [];
  return {
    presets: ["module:@react-native/babel-preset"],
    plugins: process.env.NODE_ENV === "test" ? pluginsDuringTests : plugins,
  };
};