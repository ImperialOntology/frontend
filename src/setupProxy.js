const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/main",
    createProxyMiddleware({
      target: "http://146.169.42.53:8000",
      changeOrigin: true,
    })
  );
};
