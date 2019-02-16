const APIEndpoint = process.env.NODE_ENV === "production" ? "https://essayfeedback.now.sh:3001/api" : "http://localhost:3001/api";
export default APIEndpoint;
