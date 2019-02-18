import axios from "axios";
import secrets from "../../secrets";

const APIEndpoint = process.env.NODE_ENV === "production" ? "https://essayfeedback.now.sh" : "http://localhost:3001";

const signal = axios.CancelToken.source();

export const cancelRequest = () => signal.cancel("Cancelling API request");

export default axios.create({
  baseURL: APIEndpoint,
  CancelToken: signal.token,
  secret: secrets.auth.apiToken
});
