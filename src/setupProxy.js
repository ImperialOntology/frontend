const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  
  app.use(
    "/main",
    createProxyMiddleware({
      target: BACKEND_URL,
      changeOrigin: true,
      secure: false,
      proxyTimeout: 60000, // 60 seconds timeout
      timeout: 60000, // 60 seconds timeout
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
        res.writeHead(504, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: `Connection to backend at ${BACKEND_URL} timed out. Please ensure the backend is running.` }));
      },
      pathRewrite: {
        '^/main': '/main', // this maintains the /main prefix
      },
      logLevel: 'debug'
    })
  );
};
