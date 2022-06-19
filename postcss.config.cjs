const { NODE_ENV } = process.env;

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: NODE_ENV === "development" ? 0 : 2,
    },
  },
};
