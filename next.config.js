module.exports = {
  target: "serverless",
  publicRuntimeConfig: {
    APIEndpoint: process.env.NODE_ENV === "production" ? "https://essayfeedback-api.now.sh/api" : "http://localhost:3001/api"
  }
};
