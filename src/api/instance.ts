import axios from "axios";

const instance = axios.create({

  baseURL: "http://localhost:3000/",
  //baseURL: "https://backend-test-recipe-api.onrender.com/",
});

export default instance;
