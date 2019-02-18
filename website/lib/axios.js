import axios from "axios";

const APIEndpoint = process.env.NODE_ENV === "production" ? "https://essayfeedback.now.sh" : "http://localhost:3001";

const signal = axios.CancelToken.source();
export const cancelRequest = () => signal.cancel("Cancelling API request");

function create() {
  const instance = axios.create({
    baseURL: APIEndpoint,
    CancelToken: signal.token
  });

  const checkData = data => (data ? JSON.stringify(data) : "");

  instance.interceptors.request.use(request => {
    let { method, url, data } = request;
    console.info(`Request: ${method.toUpperCase()} ${url} ${checkData(data)}`);
    return request;
  });

  instance.interceptors.response.use(response => {
    const { status, statusText, data } = response;
    console.info(`Response ${status} ${statusText} ${checkData(data)}`);
    return response;
  });

  return instance;
}

export default create;
