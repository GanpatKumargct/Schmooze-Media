import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Update this based on deployment URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
