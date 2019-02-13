import getConfig from "next/config";
const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

export default APIEndpoint;
