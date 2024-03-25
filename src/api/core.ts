import axios from "axios";

// TODO: достаточное и необходимое условие для хранения base_url
// вынести его значение во внешнюю переменную окружения ENV
const BASE_URL = "https://my-json-server.typicode.com/iskan-iskra/my_cloud_db/";

const httpClient = axios.create({
  baseURL: BASE_URL,
});

export default httpClient;
