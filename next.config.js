const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "serverless",
  publicRuntimeConfig: {
    APIEndpoint: isProd ? "https://essayfeedback-api.now.sh/api" : "http://localhost:3001/api"
  }
};
