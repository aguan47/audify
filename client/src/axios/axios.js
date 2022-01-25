import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    headers: {
        'Access-Control-Allow-Credentials': true
    }
});

export default axiosInstance;