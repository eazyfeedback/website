const APIEndpoint = process.env.NODE_ENV === "production" ? "https://essayfeedback.now.sh" : "http://localhost:3001";
export default APIEndpoint;
