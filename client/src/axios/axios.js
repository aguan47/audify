import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    headers: {
        'Access-Control-Allow-Credentials': true
    }
});

export const createAuthorization = accessToken => {
    return {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
}

export const formDataHeader = accessToken => {
    return {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    }
}

export default axiosInstance;