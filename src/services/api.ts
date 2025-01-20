import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = axios.create({
  baseURL: "http://demo.crmviet.vn:8180/crm/api/v1", // Đổi thành URL API của bạn
  timeout: 5000,
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage hoặc Redux (nếu có)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
