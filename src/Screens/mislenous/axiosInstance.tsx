import axios from "axios";

console.log('axiosInstance.tsx');
const axiosInstance = axios.create({
  baseURL: "http://staging.php-dev.in:8844/trainingapp/api",
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;



