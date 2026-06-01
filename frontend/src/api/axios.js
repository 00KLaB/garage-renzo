import axios from "axios";

const api = axios.create({
  baseURL: "https://garage-renzo.onrender.com/api",
});

export default api;