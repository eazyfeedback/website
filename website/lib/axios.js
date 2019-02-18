import axios from "axios";

const APIEndpoint = process.env.NODE_ENV === "production" ? "https://essayfeedback.now.sh" : "http://localhost:3001";

const signal = axios.CancelToken.source();
export const cancelRequest = () => signal.cancel("Cancelling API request");

function create() {
  const instance = axios.create({
    baseURL: APIEndpoint,
    CancelToken: signal.token
  });

  instance.interceptors.request.use(request => {
    console.log("Request", request);
    return request;
  });

  instance.interceptors.response.use(response => {
    console.log("Response:", response);
    return response;
  });

  return instance;
}

export default create;
