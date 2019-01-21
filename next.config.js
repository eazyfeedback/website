const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "serverless",
  publicRuntimeConfig: {
    APIEndpoint: isProd ? "https://essayfeedback.now.sh/api" : "http://localhost:3000/api"
  }
};
