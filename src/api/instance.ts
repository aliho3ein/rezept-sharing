import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.rezept-sharing.com/",
  params: {
    api_key: "",
  },
});

export default instance;
