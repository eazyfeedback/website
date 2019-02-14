const APIEndpoint = process.env.NODE_ENV === "production" ? "https://essayfeedbackapi.now.sh/api" : "http://localhost:3001/api";
export default APIEndpoint;
