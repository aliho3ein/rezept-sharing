import axios from "axios";

const instance = axios.create({

  baseURL: "https://recipe-api-backend.onrender.com/",
  //baseURL: "https://backend-test-recipe-api.onrender.com/",
});

export default instance;
